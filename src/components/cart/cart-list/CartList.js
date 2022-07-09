import { Component } from 'react';

import ProductContext from '../../../store/product-context';

class CartList extends Component {
  static contextType = ProductContext;
  
  render() {
    return <div>CartList</div>;
  }
}

export default CartList;
