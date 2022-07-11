import { Component } from 'react';

import getProduct from '../../../util/fetch-api/getProduct';

class ProductDescription extends Component {
  constructor() {
    super();
    this.state = {
      product: null,
    };
  }

  async componentDidMount() {
    const fetchedProduct = await getProduct(this.props.productId);
    this.setState({ product: fetchedProduct });
  }

  render() {
    return this.state.product && <div>{this.state.product.brand}</div>;
  }
}

export default ProductDescription;
