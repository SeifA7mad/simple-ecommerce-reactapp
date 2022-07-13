import { Component } from 'react';
import ProductItem from '../product-item/ProductItem';

import ProductContext from '../../../store/product-context';

import getProductPrice from '../../../util/fetch-api/getProductPrice';

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
    this.context.addToCart(product, false);
  }

  onRemoveFromCartHandler(id) {
    this.context.removeFromCart(id, true);
  }

  isProductInCartHandler(id) {
    return this.context.cart.hasOwnProperty(id);
  }

  render() {
    // map on products to output productItems
    const productItems = this.state.products.map((product) => (
      <ProductItem
        id={product.id}
        key={product.id}
        name={product.name}
        price={getProductPrice(product.prices, this.context.selectedCurrency)}
        img={product.gallery[0]}
        isOutOfStock={!product.inStock}
        isAddedToCart={this.isProductInCartHandler(product.id)}
        onAddToCart={() => this.onAddToCartHandler({id: product.id})}
        onRemoveFromCart={() => this.onRemoveFromCartHandler(product.id)}
      />
    ));
    return <div className={classes.productList}>{productItems}</div>;
  }
}

export default ProductList;
