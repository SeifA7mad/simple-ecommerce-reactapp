import { Component } from 'react';

import CartButton from '../navbar-button/CartButton';
import CurrencyButton from '../navbar-button/CurrencyButton';
import CartModal from '../../cart/cart-modal/CartModal';
import CurrencyModal from '../../currency/currency-modal/CurrencyModal';

import classes from './NavbarModal.module.css';

class NavbarModal extends Component {
  // manage which modal to open
  constructor() {
    super();
    this.state = {
      displayedModal: null,
    };
  }

  toggleModal(modalName) {
    this.setState((prevState) => {
      if (prevState.displayedModal === modalName) {
        return {
          displayedModal: null,
        };
      }
      return {
        displayedModal: modalName,
      };
    });
  }

  availableModals = {
    cart: <CartModal onClose={this.toggleModal.bind(this)} />,
    currency: <CurrencyModal onClose={this.toggleModal.bind(this)} />,
  };

  render() {
    return (
      <div className={classes.navbarModal}>
        <CurrencyButton
          isModalOpen={this.state.displayedModal === 'currency'}
          onClick={this.toggleModal.bind(this, 'currency')}
        />
        <CartButton onClick={this.toggleModal.bind(this, 'cart')} />
        {this.state.displayedModal &&
          this.availableModals[this.state.displayedModal]}
      </div>
    );
  }
}

export default NavbarModal;
