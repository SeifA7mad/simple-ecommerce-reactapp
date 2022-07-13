import { Component } from 'react';

import getProductPrice from '../../../util/fetch-api/getProductPrice';

import ProductTitle from '../../ui/product-title/ProductTitle';
import RadioGroup from '../../ui/attributes-group/radio-group/RadioGroup';

import classes from './CartItem.module.css';
import ProductPrice from '../../ui/attributes-group/product-price/ProductPrice';

class CartItem extends Component {
  render() {
    const productPrice = getProductPrice(
      this.props.product.prices,
      this.props.selectedCurrency
    );
    return (
      <div className={classes.cartItem}>
        <div className={classes.cartItemDescription}>
          <ProductTitle
            brand={this.props.product.brand}
            title={this.props.product.name}
          />
          <ProductPrice productPrice={productPrice} />
          {this.props.product.attributes.map((attribute) => (
            <RadioGroup
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
        <div className={classes.image}>
          <img
            src={this.props.product.gallery[0]}
            loading='lazy'
            alt='product'
            placeholder='Product'
          />
        </div>
      </div>
    );
  }
}

export default CartItem;
