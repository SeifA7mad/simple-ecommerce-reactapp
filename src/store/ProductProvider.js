import { Component } from 'react';

import ProductContext from './product-context';

const defaultState = {
  cart: [],
  totalAmount: 0,
  totalPrice: 0,
  selectedCurrency: { label: 'usd', symbol: '$' },
};

class ProductProvider extends Component {
  constructor() {
    super();
    this.state = defaultState;
  }

  onAddToCartHandler(product) {
    // check if the Product exist in the cart => just increase the amount
    // if not =>  push it to the cart with amount = 1
    // always ++totalAmount
    // always update totalprice = oldTotalPrice + productPrice

    // Get the cart and totalamount from state to manipulate it
    const newCart = structuredClone(this.state.cart);
    let newTotalAmount = this.state.totalAmount;
    let newTotalPrice = this.state.totalPrice;

    // check if product exist in array
    const foundProductIndex = newCart.findIndex((p) => p.id === product.id);

    if (foundProductIndex !== -1) {
      ++newCart[foundProductIndex].amount;
    } else {
      newCart.push({ ...product, amount: 1 });
    }

    ++newTotalAmount;
    newTotalPrice += product.price;

    this.setState({
      cart: newCart,
      totalAmount: newTotalAmount,
      totalPrice: newTotalPrice,
    });
  }

  onRemoveFromCartHandler(id) {
    // check if the Product exist in the cart =>
    // if amount > 1 => decrease the amount by 1
    // if not remove the product from the cart
    // always --totalAmount
    // always update totalprice = oldTotalPrice - productPrice

    const newCart = structuredClone(this.state.cart);
    let newTotalAmount = this.state.totalAmount;
    let newTotalPrice = this.state.totalPrice;

    // check if product exist in array
    const foundProductIndex = newCart.findIndex((p) => p.id === id);

    if (foundProductIndex === -1) return;

    newTotalPrice -= newCart[foundProductIndex].price;

    if (newCart[foundProductIndex].amount > 1) {
      --newCart[foundProductIndex].amount;
    } else {
      newCart.splice(foundProductIndex, 1);
    }

    --newTotalAmount;

    this.setState({
      cart: newCart,
      totalAmount: newTotalAmount,
      totalPrice: newTotalPrice,
    });
  }

  onChangeCurrencyHandler(currency) {
    this.setState({ selectedCurrency: currency });
  }

  render() {
    const productContext = {
      cart: this.state.cart,
      totalAmount: this.state.totalAmount,
      totalPrice: this.state.totalPrice,
      selectedCurrency: this.state.selectedCurrency,
      addToCart: this.onAddToCartHandler.bind(this),
      removeFromCart: this.onRemoveFromCartHandler.bind(this),
      changeCurrency: this.onChangeCurrencyHandler.bind(this),
    };
    
    return (
      <ProductContext.Provider value={productContext}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

export default ProductProvider;
