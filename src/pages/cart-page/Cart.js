import { Component, Fragment } from 'react';
import CartDescription from '../../components/cart/cart-description/CartDescription';

import PageTitle from '../../components/ui/page-title/PageTitle';

class Cart extends Component {
  render() {
    return (
      <Fragment>
        <PageTitle title='CART' style={{fontWeight: 'bold'}} />
        <CartDescription />
      </Fragment>
    );
  }
}

export default Cart;
