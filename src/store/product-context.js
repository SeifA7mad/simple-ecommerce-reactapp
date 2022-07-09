import { createContext } from 'react';

const ProductContext = createContext({
  cart: [],
  totalAmount: 0,
  totalPrice: 0,
  selectedCurrency: null,
  addToCart(product) {},
  removeFromCart(id) {},
  changeCurrency(currency) {},
});

export default ProductContext;