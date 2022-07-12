import { Component } from 'react';

import getProduct from '../../../util/fetch-api/getProduct';
import AttributesForm from '../../ui/attributes-form/AttributesForm';

import SelectableImages from '../../ui/images-show/SelectableImages';
import ProductTitle from '../../ui/product-title/ProductTitle';

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
          <div className={classes.productContent}>
            <ProductTitle
              brand={this.state.product.brand}
              title={this.state.product.name}
            />
            <AttributesForm attributes={this.state.product.attributes} />
          </div>
        </div>
      )
    );
  }
}

export default ProductDescription;
