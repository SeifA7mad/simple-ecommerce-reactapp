import { Component } from 'react';

import ProductContext from './product-context';

import getProduct from '../util/fetch-api/getProduct';

const defaultState = {
  cart: [],
  totalQuantity: 0,
  selectedCurrency: { label: 'usd', symbol: '$' },
};

class ProductProvider extends Component {
  constructor() {
    super();
    this.state = defaultState;
  }

  async onAddToCartHandler(product, isFetched = true) {
    // check if the Product exist in the cart => just increase the Quantity
    // if not =>  push it to the cart with Quantity = 1
    // always ++totalQuantity
    // always update totalprice = oldTotalPrice + productPrice
    // Get the cart and totalQuantity from state to manipulate it
    const newCart = structuredClone(this.state.cart);
    let newTotalQuantity = this.state.totalQuantity;

    // check if product exist in array
    const foundProductIndex = newCart.findIndex((p) => p.id === product.id);

    if (foundProductIndex !== -1) {
      ++newCart[foundProductIndex].quantity;
    } else {
      // fetch the entire product if not fetched & to check if it's still in stock
      let fetchedProduct = product;
      if (!isFetched) {
        fetchedProduct = await getProduct(product.id);
      }
      newCart.push({ ...fetchedProduct, quantity: 1 });
    }

    ++newTotalQuantity;
    this.setState({
      cart: newCart,
      totalQuantity: newTotalQuantity,
    });
  }

  onRemoveFromCartHandler(id) {
    // check if the Product exist in the cart =>
    // if Quantity > 1 => decrease the Quantity by 1
    // if not remove the product from the cart
    // always --totalQuantity
    // always update totalprice = oldTotalPrice - productPrice

    const newCart = structuredClone(this.state.cart);
    let newTotalQuantity = this.state.totalQuantity;

    // check if product exist in array
    const foundProductIndex = newCart.findIndex((p) => p.id === id);

    if (foundProductIndex === -1) return;

    if (newCart[foundProductIndex].quantity > 1) {
      --newCart[foundProductIndex].quantity;
    } else {
      newCart.splice(foundProductIndex, 1);
    }

    --newTotalQuantity;

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
    this.state.cart.forEach((product) => {
      totalPriceAmount += product.prices.find(
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
