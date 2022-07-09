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

  componentDidMount() {
    // get product category this.props.category
    // fetch products from API based on category type
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

  render() {
    // map on products to output productItems

    return (
      <div className={classes.productList}>
        <ProductItem
          img='https://asset.promod.com/product/149094-gz-1651494095.jpg?auto=webp&quality=80&width=1920'
          name='Apollo Running Short'
          price='50'
          id={1}
          isAddedToCart={this.isProductInCartHandler(1)}
          onAddToCart={() => this.onAddToCartHandler({ id: 1 })}
          onRemoveFromCart={() => this.onRemoveFromCartHandler(1)}
        />
        <ProductItem
          img='https://cdn.shopify.com/s/files/1/1962/2013/products/S19W-2400046315-MSH-1-051222-Is1-B1-8M_500x.jpg?v=1652891896'
          name='Apollo Running Short'
          price='50'
          id={2}
          isAddedToCart={this.isProductInCartHandler(2)}
          onAddToCart={() => this.onAddToCartHandler({ id: 2 })}
          onRemoveFromCart={() => this.onRemoveFromCartHandler(2)}
        />
        <ProductItem
          img='https://asset.promod.com/product/149094-gz-1651494095.jpg?auto=webp&quality=80&width=1920'
          name='Apollo Running Short'
          price='50'
          isOutOfStock
          id={3}
          isAddedToCart={this.isProductInCartHandler(3)}
          onAddToCart={() => this.onAddToCartHandler({ id: 3 })}
          onRemoveFromCart={() => this.onRemoveFromCartHandler(3)}
        />
      </div>
    );
  }
}

export default ProductList;
