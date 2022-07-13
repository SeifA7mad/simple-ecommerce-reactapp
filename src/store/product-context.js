import { createContext } from 'react';

const ProductContext = createContext({
  cart: {},
  totalAmount: 0,
  selectedCurrency: null,
  addToCart(product, isFetched = true, selectedAttributes = {}) {},
  removeFromCart(id, removeAll = false) {},
  changeCurrency(currency) {},
  calculateTotalPrice() {},
});

export default ProductContext;