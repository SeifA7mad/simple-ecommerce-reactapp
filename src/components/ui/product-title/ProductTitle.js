import React, { PureComponent } from 'react';

import classes from './ProductTitle.module.css';

class ProductTitle extends PureComponent {
  render() {
    return (
      <h2 className={`${classes.productTitle} ${this.props.style}`}>
        {this.props.brand} <br /> <span> {this.props.title} </span>
      </h2>
    );
  }
}

export default React.memo(ProductTitle);

