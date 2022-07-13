import { Component } from 'react';

import ProductContext from '../../../store/product-context';

import CartItem from '../cart-item/CartItem';

class CartList extends Component {
  static contextType = ProductContext;

  constructor() {
    super();
    this.selectedAttributes = {};
  }

  onAddToCartHandler(product) {
    this.context.addToCart(product, true, this.selectedAttributes[product.id]);
  }

  onRemoveFromCartHandler(id) {
    this.context.removeFromCart(id);
  }

  onChangeValueAttributeHandler(event, productId, attributeId) {
    if (!this.selectedAttributes[productId]) {
      this.selectedAttributes[productId] = {};
    }
    this.selectedAttributes[productId][attributeId] = event.target.value;
  }

  render() {
    const products = Object.keys(this.context.cart).map((productId) => (
      <CartItem
        key={productId}
        product={this.context.cart[productId]}
        selectedCurrency={this.context.selectedCurrency}
        onAddToCart={() => this.onAddToCartHandler({ id: productId })}
        onRemoveFromCart={() => this.onRemoveFromCartHandler(productId)}
        onChangeValue={this.onChangeValueAttributeHandler.bind(this)}
      />
    ));
    return products;
  }
}

export default CartList;
