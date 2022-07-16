import { Component } from 'react';

import ProductContext from './product-context';

import getProductPrice from '../util/fetch-api/getProductPrice';

const defaultState = {
  cart: {},
  totalQuantity: 0,
  selectedCurrency: { label: 'usd', symbol: '$' },
};

class ProductProvider extends Component {
  constructor() {
    super();
    this.state = defaultState;
  }

  onAddToCartHandler(product, selectedAttributes = {}) {
    const newCart = structuredClone(this.state.cart);
    let newTotalQuantity = this.state.totalQuantity;

    // check if product exist in cart =>
    // 1. increase the product qunatity
    // 2. push the each new seleceted product attributes to the selecetedAttributes array
    // else  =>
    // just add the product to the cart with quantity = 1
    if (newCart.hasOwnProperty(product.id)) {
      ++newCart[product.id].quantity;
      for (const attributeId in selectedAttributes) {
        newCart[product.id].selectedAttributes[attributeId].push(
          selectedAttributes[attributeId]
        );
      }
    } else {
      // start with an embtyp seleceted attribute obj and
      // fill it with the array for each seleted value
      const newSelectedAttributes = {};
      for (const attributeId in selectedAttributes) {
        newSelectedAttributes[attributeId] = [selectedAttributes[attributeId]];
      }

      newCart[product.id] = {
        ...product,
        quantity: 1,
        selectedAttributes: newSelectedAttributes,
      };
    }

    ++newTotalQuantity;
    this.setState({
      cart: newCart,
      totalQuantity: newTotalQuantity,
    });
  }

  onRemoveFromCartHandler(id, removeAll = false) {
    const newCart = structuredClone(this.state.cart);
    let newTotalQuantity = this.state.totalQuantity;

    // check if product not exist in cart
    if (!newCart.hasOwnProperty(id)) return;

    // check if the product quantity is more than 1 && removeAll != true
    // 1. decrease the Product Quantity & Total Quantity by 1
    // 2. remove the last selectedAttribute from each attribute section
    // else =>
    // 1. decrease the TotalQuantity by the Product Quantity
    // 2. delete the Product from the cart
    if (newCart[id].quantity > 1 && !removeAll) {
      --newCart[id].quantity;
      for (const attributeId in newCart[id].selectedAttributes) {
        newCart[id].selectedAttributes[attributeId].pop();
      }
      --newTotalQuantity;
    } else {
      newTotalQuantity -= newCart[id].quantity;
      delete newCart[id];
    }

    this.setState({
      cart: newCart,
      totalQuantity: newTotalQuantity,
    });
  }

  onChangeCurrencyHandler(currency) {
    this.setState({ selectedCurrency: currency });
  }

  onCalculateTotalPriceHandler() {
    // loop on cart and sum all the product prices of the selected currency
    let totalPriceAmount = 0.0;
    const currentCurrency = this.state.selectedCurrency;
    const cartIdKeys = Object.keys(this.state.cart);
    cartIdKeys.forEach((productId) => {
      totalPriceAmount +=
        getProductPrice(this.state.cart[productId].prices, currentCurrency)
          .amount * this.state.cart[productId].quantity;
    });

    return totalPriceAmount.toFixed(2);
  }

  render() {
    const productContext = {
      cart: this.state.cart,
      totalQuantity: this.state.totalQuantity,
      selectedCurrency: this.state.selectedCurrency,
      addToCart: this.onAddToCartHandler.bind(this),
      removeFromCart: this.onRemoveFromCartHandler.bind(this),
      changeCurrency: this.onChangeCurrencyHandler.bind(this),
      calculateTotalPrice: this.onCalculateTotalPriceHandler.bind(this),
    };

    return (
      <ProductContext.Provider value={productContext}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

export default ProductProvider;
