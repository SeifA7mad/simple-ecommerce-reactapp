import { Component } from 'react';

import ProductContext from '../../../store/product-context';

import CartList from '../cart-list/CartList';
import Modal from '../../ui/modal/Modal';
import Button from '../../ui/button/Button';

import classes from './CartModal.module.css';

class CartModal extends Component {
  static contextType = ProductContext;

  render() {
    return (
      <Modal style={classes.cartModal} onClose={this.props.onClose}>
        <h1 className={classes.cartModalTitle}>
          My Bag: <span>{this.context.totalQuantity} items </span>
        </h1>
        <CartList
          cart={this.context.cart}
          addToCart={this.context.addToCart}
          removeFromCart={this.context.removeFromCart}
          selectedCurrency={this.context.selectedCurrency}
          cartStyle={classes.cartList}
        />
        <section className={classes.cartTotal}>
          <p>Total</p>
          <p>
            {this.context.selectedCurrency.symbol}
            {this.context.calculateTotalPrice()}
          </p>
        </section>
        <section className={classes.cartButton}>
          <Button type='link' link='/cart' replace onClick={this.props.onClose}>
            View Bag
          </Button>
          <Button type='submit' disabled>
            Checkout
          </Button>
        </section>
      </Modal>
    );
  }
}

export default CartModal;
