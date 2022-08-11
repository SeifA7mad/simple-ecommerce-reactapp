import { Component } from 'react';
import classes from './OutOfStock.module.css';

class OutOfStock extends Component {
  render() {
    return <p className={`${classes.outOfStock} ${this.props.style}`}> OUT OF STOCK </p>;
  }
}

export default OutOfStock;
