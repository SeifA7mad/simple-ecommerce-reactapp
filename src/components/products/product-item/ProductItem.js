import { Component } from 'react';

import Card from '../../ui/card/Card';

import classes from './ProductItem.module.css';

class ProductItem extends Component {
  render() {
    return (
      <Card>
        <div className={classes.productItem}>
          <img src={this.props.img} alt='Product' />
          <div className={classes.productContent}>
            <p> {this.props.name} </p>
            <p className={classes.price}> ${(+this.props.price).toFixed(2)} </p>
          </div>
        </div>
      </Card>
    );
  }
}

export default ProductItem;
