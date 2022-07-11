import { createContext } from 'react';

const ProductContext = createContext({
  cart: [],
  totalAmount: 0,
  selectedCurrency: null,
  addToCart(product, isFetched = true) {},
  removeFromCart(id) {},
  changeCurrency(currency) {},
  calculateTotalPrice() {},
});

export default ProductContext;