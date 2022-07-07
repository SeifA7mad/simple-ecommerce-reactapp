import { Component } from 'react';

import CartButton from '../navbar-button/CartButton';
import CurrencyButton from '../navbar-button/CurrencyButton';
import CartModal from '../../cart/cart-modal/CartModal';

import classes from './NavbarModal.module.css';

class NavbarModal extends Component {
  // manage which modal to open
  constructor() {
    super();
    this.state = {
      displayedModal: null,
    };
  }

  toggleCartModal() {
    // prevState
  }

  availableModals = {
    cartModal: <CartModal onClose={this.toggleCartModal.bind(this)} />,
  };

  render() {
    return (
      <div className={classes.navbarModal}>
        <CurrencyButton isModalOpen />
        <CartButton onClick={this.toggleCartModal.bind(this)} />
        {this.state.displayedModal &&
          this.availableModals[this.state.displayedModal]}
      </div>
    );
  }
}

export default NavbarModal;
