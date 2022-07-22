import React, { Component } from 'react';

import classes from './ProductPrice.module.css';

class ProductPrice extends Component {
  render() {
    return (
      <p className={`${classes.productPrice} ${this.props.style}`}>
        {this.props.productPrice.symbol}
        {this.props.productPrice.amount.toFixed(2)}
      </p>
    );
  }
}

export default React.memo(ProductPrice);
