import { Component } from 'react';

import ProductContext from '../../../store/product-context';

import CartList from '../cart-list/CartList';
import Button from '../../ui/button/Button';

import classes from './CartDescription.module.css';

class CartDescription extends Component {
  static contextType = ProductContext;
  onSubmitFormHandler(event) {
    event.preventDefault();
  }

  render() {
    let cartContent = (
      <h3> You have no items in your Cart!! </h3>
    );

    if (Object.keys(this.context.cart).length > 0) {
      const totalPrice = this.context.calculateTotalPrice();
      const tax = totalPrice * 0.21;

      cartContent = (
        <form onSubmit={this.onSubmitFormHandler}>
          <CartList
            cart={this.context.cart}
            addToCart={this.context.addToCart}
            removeFromCart={this.context.removeFromCart}
            selectedCurrency={this.context.selectedCurrency}
            itemStyle={classes.cartItem}
            cartStyle={classes.cartList}
            changeable
          />
          <section className={classes.priceDetails}>
            <p>Tax 21%:</p>
            <h4>
              {this.context.selectedCurrency.symbol}
              {tax.toFixed(2)}
            </h4>
            <p>Quantity:</p>
            <h4> {this.context.totalQuantity} </h4>
            <p>Total:</p>
            <h4>
              {this.context.selectedCurrency.symbol}
              {totalPrice}
            </h4>
          </section>
          <Button type='submit' disabled>
            ORDER
          </Button>
        </form>
      );
    }
    return cartContent;
  }
}

export default CartDescription;
