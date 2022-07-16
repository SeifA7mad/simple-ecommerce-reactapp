import { Component } from 'react';

import Button from './Button';
import ModalArrow from '../../ui/modal/modal-arrow/ModalArrow';

import ProductContext from '../../../store/product-context';

import classes from './CurrencyButton.module.css';

class CurrencyButton extends Component {
  static contextType = ProductContext;

  render() {
    return (
      <Button onClick={this.props.onClick}>
        <i className={classes.currencySymbol}> {this.context.selectedCurrency.symbol} </i>
        <ModalArrow
          style={classes.arrow}
          isModalOpen={this.props.isModalOpen}
        />
      </Button>
    );
  }
}

export default CurrencyButton;
