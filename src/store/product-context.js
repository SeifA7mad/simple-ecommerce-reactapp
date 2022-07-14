import { createContext } from 'react';

const ProductContext = createContext({
  cart: {},
  totalQuantity: 0,
  selectedCurrency: null,
  addToCart(product, selectedAttributes = {}, isFetched = true) {},
  removeFromCart(id, removeAll = false) {},
  changeCurrency(currency) {},
  calculateTotalPrice() {},
});

export default ProductContext;