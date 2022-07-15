import { Component } from 'react';
import { Navigate } from 'react-router-dom';

import Card from '../../ui/card/Card';
import CartIcon from '../../cart/CartIcon';

import classes from './ProductItem.module.css';

class ProductItem extends Component {
  constructor() {
    super();
    this.state = {
      doesNavigate: false,
    };
  }

  onNavigateHandler() {
    this.setState({ doesNavigate: true });
  }

  render() {
    if (this.state.doesNavigate) {
      return <Navigate to={`/product/${this.props.id}`} replace />;
    }

    return (
      <Card active={this.props.isAddedToCart}>
        <div
          className={`${classes.productItem} ${
            this.props.isOutOfStock ? classes.isOutOfStock : null
          }`}
          onClick={() =>
            !this.props.isOutOfStock ? this.onNavigateHandler(this) : null
          }
        >
          <img
            src={this.props.img}
            alt='Product'
            loading='lazy'
            placeholder={this.props.name}
          />
          <section className={classes.productContent}>
            <p> {this.props.name} </p>
            <p className={classes.price}>
              {this.props.price.symbol}
              {(+this.props.price.amount).toFixed(2)}
            </p>
          </section>
        </div>
        {this.props.isOutOfStock && (
          <p className={classes.outOfStock}> OUT OF STOCK </p>
        )}
        {this.props.isAddedToCart && (
          <CartIcon
            onClick={this.props.onRemoveFromCart}
            style={classes.addToCartIcon}
          />
        )}
      </Card>
    );
  }
}

export default ProductItem;
