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
        />
        <div className={classes.cartTotal}>
          <p>Total</p>
          <p>
            {this.context.selectedCurrency.symbol}
            {this.context.calculateTotalPrice()}
          </p>
        </div>
        <div className={classes.cartButton}>
          <Button type='link' link='/cart' replace>
            View Bag
          </Button>
          <Button type='submit' disabled>
            Checkout
          </Button>
        </div>
      </Modal>
    );
  }
}

export default CartModal;
