import { Component } from 'react';

import ProductContext from './product-context';

import getProductPrice from '../util/helpers/getProductPrice';

const defaultState = {
  cart: {},
  totalQuantity: 0,
  selectedCurrency: { label: 'USD', symbol: '$' },
};

class ProductProvider extends Component {
  constructor() {
    super();
    this.state = defaultState;
  }

  onAddToCartHandler(product, attributes = null) {
    const newCart = structuredClone(this.state.cart);
    let newTotalQuantity = this.state.totalQuantity;

    let existingProductKey = product.id;
    // if attrinutes != null =>
    // loop on every product in the cart to check if the there is a existing product in the cart that has the same
    // id & selected attributes if found => change existingProductKey with the founded productKey
    if (attributes) {
      for (const productKey in newCart) {
        if (
          newCart[productKey].id === product.id &&
          JSON.stringify(newCart[productKey].selectedAttributes) ===
            JSON.stringify(attributes)
        ) {
          existingProductKey = productKey;
          break;
        }
      }
    }

    // if attributes == null OR there is a existing product in the cart AND have the same selected attributes =>
    // just increase the product qunatity
    // else =>
    // add the new product to the Cart BUT with different key
    // if the key exist in the cart generate a new key
    if (
      !attributes ||
      (newCart[existingProductKey] &&
        JSON.stringify(newCart[existingProductKey].selectedAttributes) ===
          JSON.stringify(attributes))
    ) {
      ++newCart[existingProductKey].quantity;
    } else {
      let newProductId = product.id;
      if (newCart[product.id]) {
        newProductId = `${product.id}_${Date.now()}`;
      }
      newCart[newProductId] = {
        ...product,
        quantity: 1,
        selectedAttributes: { ...attributes },
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
    // else =>
    // loop on every productKey in the cart
    // if the productKey === the id OR (removeAll=true AND the first part of the productKey which is common in
    // all the product of the same type == id)
    // 1. decrease the Total Quantity by Product Quantity 
    // 2. delete the product from cart
    if (newCart[id].quantity > 1 && !removeAll) {
      --newCart[id].quantity;
      --newTotalQuantity;
    } else {
      for (const productKey in newCart) {
        const productId = productKey.split('_')[0];
        if (productKey === id || (removeAll && productId === id)) {
          newTotalQuantity -= newCart[productKey].quantity;
          delete newCart[productKey];
        }
      }
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
