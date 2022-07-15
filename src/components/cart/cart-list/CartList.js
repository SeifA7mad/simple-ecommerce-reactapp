import { Component } from 'react';

import CartItem from '../cart-item/CartItem';

import classes from './CartList.module.css';

class CartList extends Component {
  constructor() {
    super();
    this.selectedAttributes = {};
  }

  componentDidMount() {
    for (const productId in this.props.cart) {
      this.selectedAttributes[productId] = {};
      for (const attribute in this.props.cart[productId].selectedAttributes) {
        this.selectedAttributes[productId][attribute] =
          this.props.cart[productId].selectedAttributes[attribute][0];
      }
    }
  }

  onAddToCartHandler(product) {
    this.props.addToCart(product, this.selectedAttributes[product.id]);
  }

  onRemoveFromCartHandler(id) {
    this.props.removeFromCart(id);
  }

  onChangeValueAttributeHandler(event, productId, attributeId) {
    this.selectedAttributes[productId][attributeId] = event.target.value;
  }

  render() {
    const products = Object.keys(this.props.cart).map((productId) => (
      <CartItem
        key={productId}
        product={this.props.cart[productId]}
        selectedCurrency={this.props.selectedCurrency}
        onAddToCart={this.onAddToCartHandler.bind(this, { id: productId })}
        onRemoveFromCart={() => this.onRemoveFromCartHandler(productId)}
        onChangeValue={this.onChangeValueAttributeHandler.bind(this)}
        style={this.props.itemStyle}
        changeable={
          this.props.changeable
        }
      />
    ));
    return (
      <div className={`${classes.cartList} ${this.props.cartStyle}`}>
        {products}
      </div>
    );
  }
}

export default CartList;
