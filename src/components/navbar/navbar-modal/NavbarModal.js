import { Component } from "react";

import CartButton from '../navbar-button/CartButton';
import CurrencyButton from '../navbar-button/CurrencyButton';

import classes from './NavbarModal.module.css';

class NavbarModal extends Component {
    // manage which modal to open
    render() {
        return (
            <div className={classes.navbarModal}>
                <CurrencyButton isModalOpen />
                <CartButton />
            </div>
        );
    }
}

export default NavbarModal;