import { Component } from 'react';
import { Navigate } from 'react-router-dom';

import Card from '../../ui/card/Card';
import CartIcon from '../../cart/CartIcon';

import classes from './ProductItem.module.css';

class ProductItem extends Component {
  constructor() {
    super();
    this.state = {
      isAddedToCart: false,
      isHovered: false,
      doesNavigate: false,
    };
  }

  componentDidMount() {
    this.setState({ isAddedToCart: this.props.isAddedToCart });
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

  onAddToCartHandler() {
    // call add to cart function from ctx
    // change isAddedToCart=true
    this.setState((prevState) => {
      return { isAddedToCart: !prevState.isAddedToCart };
    });
  }

  onNavigateHandler() {
    this.setState({ doesNavigate: true });
  }

  render() {
    const canAddToCart = !this.state.isAddedToCart && !this.props.isOutOfStock;

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
          <img src={this.props.img} alt='Product' />
          <div className={classes.productContent}>
            <p> {this.props.name} </p>
            <p className={classes.price}> ${(+this.props.price).toFixed(2)} </p>
          </div>
        </div>
        {this.props.isOutOfStock && (
          <p className={classes.outOfStock}> OUT OF STOCK </p>
        )}
        {(this.state.isHovered || this.state.isAddedToCart) && (
          <CartIcon
            onClick={() => this.onAddToCartHandler(this)}
            style={classes.addToCartIcon}
          />
        )}
        {this.state.doesNavigate && (
          <Navigate to={`/product/${this.props.id}`} replace />
        )}
      </Card>
    );
  }
}

export default ProductItem;
