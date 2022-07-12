import { Component } from 'react';

import classes from './ProductTitle.module.css';

class ProductTitle extends Component {
  render() {
    return (
      <h2 className={`${classes.productTitle} ${this.props.style}`}>
        {this.props.brand} <br /> <span> {this.props.title} </span>
      </h2>
    );
  }
}

export default ProductTitle;
