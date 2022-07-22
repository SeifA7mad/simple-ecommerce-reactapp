import { Component } from 'react';

import CartItem from '../cart-item/CartItem';

import classes from './CartList.module.css';

class CartList extends Component {
  onAddToCartHandler(product) {
    this.props.addToCart(product);
  }

  onRemoveFromCartHandler(id) {
    this.props.removeFromCart(id);
  }

  render() {
    const products = Object.keys(this.props.cart).map((productKey) => (
      <CartItem
        key={productKey}
        productId={productKey}
        product={this.props.cart[productKey]}
        selectedCurrency={this.props.selectedCurrency}
        onAddToCart={this.onAddToCartHandler.bind(this, {
          id: productKey,
        })}
        onRemoveFromCart={this.onRemoveFromCartHandler.bind(this, productKey)}
        style={this.props.itemStyle}
        changeable={this.props.changeable}
        miniCart={this.props.miniCart}
      />
    ));
    return (
      <div className={`${classes.cartList} ${this.props.cartStyle}`}>
        {products}
      </div>
    );
  }
}

export default CartList;
