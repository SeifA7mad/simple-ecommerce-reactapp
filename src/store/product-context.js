import { createContext } from 'react';

const ProductContext = createContext({
  cart: [],
  totalAmount: 0,
  selectedCurrency: null,
  addTocart(product) {},
  removeFromCart(id) {},
  changeCurrency(currency) {},
});

export default ProductContext;