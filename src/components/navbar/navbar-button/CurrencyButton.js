import { Component } from 'react';

import CurrencyIcon from '../../currency/CurrencyIcon';
import Button from './Button';
import ModalArrow from '../../ui/modal/modal-arrow/ModalArrow';

import classes from './CurrencyButton.module.css';

class CurrencyButton extends Component {
  render() {
    return (
      <Button onClick={this.props.onClick}>
        <CurrencyIcon style={classes.icon} />
        <ModalArrow style={classes.arrow} isModalOpen={this.props.isModalOpen} />
      </Button>
    );
  }
}

export default CurrencyButton;
