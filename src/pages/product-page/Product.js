import { Component, Fragment } from 'react';

import withRouter from '../../util/hoc/withRouter';

import ProductDescription from '../../components/products/product-description/ProductDescription';

class Product extends Component {
  render() {
    return (
      <Fragment>
       {this.props.router.params.id && <ProductDescription productId={this.props.router.params.id} />}
      </Fragment>
    );;
  }
}

export default withRouter(Product);
