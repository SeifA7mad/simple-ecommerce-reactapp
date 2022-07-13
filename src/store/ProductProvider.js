import { Component } from 'react';

import ProductContext from './product-context';

import getProduct from '../util/fetch-api/getProduct';

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

  async onAddToCartHandler(product, isFetched = true, selectedAttributes = {}) {
    // check if the Product exist in the cart => just increase the Quantity
    // if not =>  push it to the cart with Quantity = 1
    // always ++totalQuantity
    // always update totalprice = oldTotalPrice + productPrice
    // Get the cart and totalQuantity from state to manipulate it
    const newCart = structuredClone(this.state.cart);
    let newTotalQuantity = this.state.totalQuantity;

    // check if product exist in cart
    if (newCart.hasOwnProperty(product.id)) {
      ++newCart[product.id].quantity;
      newCart[product.id].selectedAttributes = selectedAttributes;
    } else {
      // fetch the entire product if not fetched & to check if it's still in stock
      let fetchedProduct = product;
      if (!isFetched) {
        fetchedProduct = await getProduct(product.id);
      }
      newCart[product.id] = {
        ...fetchedProduct,
        quantity: 1,
        selectedAttributes: selectedAttributes,
      };
    }

    ++newTotalQuantity;
    console.log(newCart);
    this.setState({
      cart: newCart,
      totalQuantity: newTotalQuantity,
    });
  }

  onRemoveFromCartHandler(id, removeAll = false) {
    // check if the Product exist in the cart =>
    // if Quantity > 1 => decrease the Quantity by 1
    // if not remove the product from the cart
    // always --totalQuantity
    // always update totalprice = oldTotalPrice - productPrice

    const newCart = structuredClone(this.state.cart);
    let newTotalQuantity = this.state.totalQuantity;

    // check if product not exist in cart
    if (!newCart.hasOwnProperty(id)) return;

    // TODO: refactor
    if (!removeAll) {
      if (newCart[id].quantity > 1) {
        --newCart[id].quantity;
      } else {
        delete newCart[id];
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
    const currentCurrency = this.state.selectedCurrency.label;
    const cartIdKeys = Object.keys(this.state.cart);
    cartIdKeys.forEach((productId) => {
      totalPriceAmount += this.state.cart[productId].prices.find(
        (price) =>
          price.currency.label.toLowerCase() === currentCurrency.toLowerCase()
      ).amount;
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
