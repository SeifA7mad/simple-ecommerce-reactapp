import { Component } from 'react';
import ProductItem from '../product-item/ProductItem';

import ProductContext from '../../../store/product-context';

import classes from './ProductList.module.css';

class ProductList extends Component {
  static contextType = ProductContext;

  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  async fetchProducts(categoryName) {
    // get product category this.props.category
    // fetch products from API based on category type
    const graphqlQuery = {
      query: `
        query {
          category(input: {title: "${categoryName}"}) {
            products {
              id name inStock gallery brand 
              prices { amount currency{ label } }
          }}
        }
      `,
    };
    try {
      const response = await fetch('http://localhost:4000', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(graphqlQuery),
      });

      const resData = await response.json();

      this.setState({ products: resData.data.category.products });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.fetchProducts(this.props.categoryName);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.categoryName !== this.props.categoryName) {
      this.fetchProducts(this.props.categoryName);
    }
  }

  onAddToCartHandler(product) {
    this.context.addToCart(product);
  }

  onRemoveFromCartHandler(id) {
    this.context.removeFromCart(id);
  }

  isProductInCartHandler(id) {
    return this.context.cart.find((p) => id === p.id) ? true : false;
  }

  getProductPrice(prices) {
    const currency = this.context.selectedCurrency
      ? this.context.selectedCurrency
      : { label: 'usd', symbol: '$' };

    const displayedPrice = prices.find(
      (price) =>
        price.currency.label.toLowerCase() === currency.label.toLowerCase()
    );

    return { amount: displayedPrice.amount, symbol: currency.symbol};
  }

  render() {
    // map on products to output productItems
    const productItems = this.state.products.map((product) => (
      <ProductItem
        id={product.id}
        key={product.id}
        name={product.name}
        price={this.getProductPrice(product.prices)}
        img={product.gallery[0]}
        isOutOfStock={!product.inStock}
        isAddedToCart={this.isProductInCartHandler(product.id)}
        onAddToCart={() => this.onAddToCartHandler(product)}
        onRemoveFromCart={() => this.onRemoveFromCartHandler(product.id)}
      />
    ));
    return <div className={classes.productList}>{productItems}</div>;
  }
}

export default ProductList;
