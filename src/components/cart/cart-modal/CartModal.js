import { Component } from 'react';

import ProductContext from '../../../store/product-context';

import Modal from '../../ui/modal/Modal';

import classes from './CartModal.module.css';

class CartModal extends Component {
  static contextType = ProductContext;

  render() {
    return (
      <Modal style={classes.cartModal} onClose={this.props.onClose}>
        {this.context.selectedCurrency.symbol}{this.context.calculateTotalPrice()}
      </Modal>
    );
  }
}

export default CartModal;
