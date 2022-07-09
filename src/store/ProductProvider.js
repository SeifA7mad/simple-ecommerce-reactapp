import { Component } from 'react';

import ProductContext from './product-context';

const defaultState = {
  cart: [],
  totalAmount: 0,
  selectedCurrency: null,
};

class ProductProvider extends Component {
  constructor() {
    super();
    this.state = defaultState;
  }

  onAddTocartHandler(product) {}
  onRemoveFromcartHandler(id) {}
  onChangeCurrencyHandler(currency) {}

  render() {
    const productContext = {
      cart: this.state.cart,
      totalAmount: this.state.totalAmount,
      selectedCurrency: this.state.selectedCurrency,
      addTocart: this.onAddTocartHandler,
      removeFromCart: this.onRemoveFromcartHandler,
      changeCurrency: this.onChangeCurrencyHandler,
    };
    return (
      <ProductContext.Provider value={productContext}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

export default ProductProvider;
