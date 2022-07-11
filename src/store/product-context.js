import { createContext } from 'react';

const ProductContext = createContext({
  cart: [],
  totalAmount: 0,
  selectedCurrency: null,
  addToCart(product) {},
  removeFromCart(id) {},
  changeCurrency(currency) {},
  calculateTotalPrice() {}
});

export default ProductContext;