import { Component } from 'react';
import { Navigate } from 'react-router-dom';

import Card from '../../ui/card/Card';
import CartIcon from '../../cart/CartIcon';

import classes from './ProductItem.module.css';

class ProductItem extends Component {
  constructor() {
    super();
    this.state = {
      isHovered: false,
      doesNavigate: false,
    };
  }

  onMouseOverHandler() {
    this.setState((prevState) => {
      if (!prevState.isHovered) {
        return { isHovered: true };
      }
    });
  }

  onMouseLeaveHandler() {
    this.setState((prevState) => {
      if (prevState.isHovered) {
        return { isHovered: false };
      }
    });
  }

  onNavigateHandler() {
    this.setState({ doesNavigate: true });
  }

  render() {
    if (this.state.doesNavigate) {
      return <Navigate to={`/product/${this.props.id}`} replace />;
    }

    const canAddToCart = !this.props.isAddedToCart && !this.props.isOutOfStock;

    return (
      <Card
        onMouseOver={() =>
          canAddToCart ? this.onMouseOverHandler(this) : null
        }
        onMouseLeave={() =>
          canAddToCart ? this.onMouseLeaveHandler(this) : null
        }
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
          <div className={classes.productContent}>
            <p> {this.props.name} </p>
            <p className={classes.price}>
              {this.props.price.symbol}
              {(+this.props.price.amount).toFixed(2)}
            </p>
          </div>
        </div>
        {this.props.isOutOfStock && (
          <p className={classes.outOfStock}> OUT OF STOCK </p>
        )}
        {(this.state.isHovered || this.props.isAddedToCart) && (
          <CartIcon
            onClick={
              this.props.isAddedToCart
                ? this.props.onRemoveFromCart
                : this.props.onAddToCart
            }
            style={classes.addToCartIcon}
          />
        )}
      </Card>
    );
  }
}

export default ProductItem;
