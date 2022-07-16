import { createContext } from 'react';

const ProductContext = createContext({
  cart: {},
  totalQuantity: 0,
  selectedCurrency: null,
  addToCart(product, attributes = null) {},
  removeFromCart(id, removeAll = false) {},
  changeCurrency(currency) {},
  calculateTotalPrice() {},
});

export default ProductContext;