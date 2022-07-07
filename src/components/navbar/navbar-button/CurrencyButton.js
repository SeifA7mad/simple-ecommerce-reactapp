import { Component } from 'react';

import CurrencyIcon from '../../currency/CurrencyIcon';
import Button from './Button';

import classes from './CurrencyButton.module.css';

class CurrencyButton extends Component {
  // manage direction of arrow

  render() {
    return (
      <Button onClick={this.props.onClick}>
        <CurrencyIcon style={classes.icon} />
        <span
          className={`${classes.arrow} ${
            this.props.isModalOpen ? classes.up : classes.down
          }`}
        ></span>
      </Button>
    );
  }
}

export default CurrencyButton;
