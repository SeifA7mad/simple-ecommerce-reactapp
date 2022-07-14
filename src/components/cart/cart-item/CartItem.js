import { Component } from 'react';

import getProductPrice from '../../../util/fetch-api/getProductPrice';

import ProductTitle from '../../ui/product-title/ProductTitle';
import RadioGroup from '../../ui/attributes-group/radio-group/RadioGroup';

import classes from './CartItem.module.css';
import ProductPrice from '../../ui/attributes-group/product-price/ProductPrice';
import ChangeableImages from '../../ui/images-show/ChangeableImages';

class CartItem extends Component {
  render() {
    const productPrice = getProductPrice(
      this.props.product.prices,
      this.props.selectedCurrency
    );
    return (
      <div className={`${classes.cartItem} ${this.props.style}`}>
        <div className={classes.cartItemDescription}>
          <ProductTitle
            brand={this.props.product.brand}
            title={this.props.product.name}
          />
          <ProductPrice productPrice={productPrice} />
          {this.props.product.attributes.map((attribute) => (
            <RadioGroup
              productId={this.props.product.id}
              key={attribute.id}
              attribute={attribute}
              selectedAttributes={this.props.product.selectedAttributes}
              onChange={(e) =>
                this.props.onChangeValue(e, this.props.product.id, attribute.id)
              }
            />
          ))}
        </div>
        <div className={classes.cartInputs}>
          <button onClick={this.props.onAddToCart}>+</button>
          <p> {this.props.product.quantity} </p>
          <button onClick={this.props.onRemoveFromCart}>-</button>
        </div>
        <ChangeableImages
          gallery={this.props.product.gallery}
          changeable={this.props.changeable}
        />
      </div>
    );
  }
}

export default CartItem;
