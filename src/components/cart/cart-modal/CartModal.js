import { Component } from 'react';

import Modal from '../../ui/modal/Modal';

import classes from './CartModal.module.css';

class CartModal extends Component {
  render() {
    return (
      <Modal style={classes.cartModal} onClose={this.props.onClose}>
        CartModal
      </Modal>
    );
  }
}

export default CartModal;
