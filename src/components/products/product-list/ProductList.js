import { Component } from 'react';
import ProductItem from '../product-item/ProductItem';

import classes from './ProductList.module.css';

class ProductList extends Component {
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

  render() {
    // map on products to output productItems

    return (
      <div className={classes.productList}>
        <ProductItem
          img='https://asset.promod.com/product/149094-gz-1651494095.jpg?auto=webp&quality=80&width=1920'
          name='Apollo Running Short'
          price='50'
          isAddedToCart
          id={1}
        />
        <ProductItem
          img='https://asset.promod.com/product/149094-gz-1651494095.jpg?auto=webp&quality=80&width=1920'
          name='Apollo Running Short'
          price='50'
          id={2}
        />
        <ProductItem
          img='https://asset.promod.com/product/149094-gz-1651494095.jpg?auto=webp&quality=80&width=1920'
          name='Apollo Running Short'
          price='50'
          isOutOfStock
          id={3}
        />
      </div>
    );
  }
}

export default ProductList;
