import { Component } from 'react';

import ProductContext from '../../../store/product-context';

import getProduct from '../../../util/fetch-api/getProduct';
import getProductPrice from '../../../util/fetch-api/getProductPrice';

import RadioGroup from '../../ui/attributes-group/radio-group/RadioGroup';
import SelectableImages from '../../ui/images-show/SelectableImages';
import ProductTitle from '../../ui/product-title/ProductTitle';
import Button from '../../ui/button/Button';

import classes from './ProductDescription.module.css';

class ProductDescription extends Component {
  static contextType = ProductContext;

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

  onSubmitFormHandler(event) {
    event.preventDefault();
  }

  onChangeValueHandler(e, id) {
    // console.log(id);
  }

  render() {
    let productPrice = null;
    if (this.state.product) {
      productPrice = getProductPrice(
        this.state.product.prices,
        this.context.selectedCurrency
      );
    }
    return (
      this.state.product && (
        <div className={classes.productDescription}>
          <SelectableImages images={this.state.product.gallery} />
          <form
            onSubmit={this.onSubmitFormHandler}
            className={classes.productContent}
          >
            <ProductTitle
              brand={this.state.product.brand}
              title={this.state.product.name}
            />
            {this.state.product.attributes.map((attribute) => (
              <RadioGroup
                key={attribute.id}
                attribute={attribute}
                onChange={(e) => this.onChangeValueHandler(e, attribute.id)}
              />
            ))}
            <p className={classes.price}>
              Price: <br />
              <span>
                {productPrice.symbol}
                {productPrice.amount.toFixed(2)}
              </span>
            </p>
            <Button type='submit'> ADD TO CART </Button>
            <div className={classes.description} dangerouslySetInnerHTML={{__html: `${this.state.product.description}`}}></div>
          </form>
        </div>
      )
    );
  }
}

export default ProductDescription;
