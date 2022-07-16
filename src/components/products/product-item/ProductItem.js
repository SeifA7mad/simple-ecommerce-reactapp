import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

import Card from '../../ui/card/Card';
import CartIcon from '../../cart/CartIcon';

import classes from './ProductItem.module.css';

class ProductItem extends Component {
  constructor() {
    super();
    this.state = {
      doesNavigate: false,
      isHovered: false,
    };
  }

  onNavigateHandler() {
    this.setState({ doesNavigate: true });
  }

  onEnterMouseHandler() {
    this.setState((prevState) => {
      if (!prevState.isHovered) {
        return { isHovered: true };
      }
    });
  }

  onExitMouseHandler() {
    this.setState((prevState) => {
      if (prevState.isHovered) {
        return { isHovered: false };
      }
    });
  }

  render() {
    if (this.state.doesNavigate) {
      return <Navigate to={`/product/${this.props.id}`} replace />;
    }

    const canAddToCart = !this.props.isAddedToCart && !this.props.isOutOfStock;

    return (
      <Card
        onMouseEnter={canAddToCart ? this.onEnterMouseHandler.bind(this) : null}
        onMouseLeave={canAddToCart ? this.onExitMouseHandler.bind(this) : null}
        active={this.props.isAddedToCart}
      >
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
        {(this.props.isAddedToCart || this.state.isHovered) && (
          <span
            className={classes.addToCartIcon}
            onClick={
              this.props.isAddedToCart
                ? this.props.onRemoveFromCart
                : this.props.onShowModal
            }
          >
            <CartIcon style={classes.cartIcon} color='#ffff' />
          </span>
        )}
      </Card>
    );
  }
}

export default React.memo(ProductItem);
