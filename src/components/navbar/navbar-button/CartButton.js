import { Component } from 'react';

import CartIcon from '../../cart/CartIcon';
import Button from './Button';

import classes from './CartButton.module.css';

class CartButton extends Component {
    // manage number of items
    // access context to get cart items
  render() {
    return (
      <Button onClick={this.props.onClick}>
        <CartIcon style={classes.icon} />
        <span className={classes.badge}>{2}</span>
      </Button>
    );
  }
}

export default CartButton;
