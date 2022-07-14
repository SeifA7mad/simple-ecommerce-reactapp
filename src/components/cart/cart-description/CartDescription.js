import { Component } from 'react';

import ProductContext from '../../../store/product-context';

import CartList from '../cart-list/CartList';

import classes from './CartDescription.module.css';

class CartDescription extends Component {
  static contextType = ProductContext;
  onSubmitFormHandler(event) {
    event.preventDefault();
  }


  render() {
    return (
      <form onSubmit={this.onSubmitFormHandler}>
        <CartList
          cart={this.context.cart}
          addToCart={this.context.addToCart}
          removeFromCart={this.context.removeFromCart}
          selectedCurrency={this.context.selectedCurrency}
          itemStyle={classes.cartList}
          changeable
        />
      </form>
    );
  }
}

export default CartDescription;
