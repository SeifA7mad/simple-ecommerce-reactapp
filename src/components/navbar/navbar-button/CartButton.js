import { Component } from 'react';

import ProductContext from '../../../store/product-context';

import CartIcon from '../../cart/CartIcon';
import Button from './Button';

import classes from './CartButton.module.css';

class CartButton extends Component {
  static contextType = ProductContext;

  render() {
    return (
      <Button onClick={this.props.onClick}>
        <CartIcon style={classes.icon} />
        <span className={classes.badge}>{this.context.totalAmount}</span>
      </Button>
    );
  }
}

export default CartButton;
