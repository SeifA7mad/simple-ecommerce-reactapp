import { Component } from 'react';

import getProduct from '../../../util/fetch-api/getProduct';

import SelectableImages from '../../ui/images-show/SelectableImages';

import classes from './ProductDescription.module.css';

class ProductDescription extends Component {
  constructor() {
    super();
    this.state = {
      product: null,
    };
  }

  async componentDidMount() {
    // TODO: check redrender x2 whyy?
    const fetchedProduct = await getProduct(this.props.productId);
    this.setState({ product: fetchedProduct });
  }

  render() {
    return (
      this.state.product && (
        <div className={classes.productDescription}>
          <SelectableImages images={this.state.product.gallery} />
        </div>
      )
    );
  }
}

export default ProductDescription;
