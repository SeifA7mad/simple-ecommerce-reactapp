import { Component } from 'react';

import ProductContext from '../../../store/product-context';

import getProduct from '../../../util/fetch-api/getProduct';
import getProductPrice from '../../../util/fetch-api/getProductPrice';

import RadioGroup from '../../ui/attributes-group/radio-group/RadioGroup';
import SelectableImages from '../../ui/images-show/SelectableImages';
import ProductTitle from '../../ui/product-title/ProductTitle';
import Button from '../../ui/button/Button';

import classes from './ProductDescription.module.css';
import ErrorMessage from '../../ui/error/ErrorMessage';

class ProductDescription extends Component {
  static contextType = ProductContext;

  constructor() {
    super();
    this.state = {
      product: null,
      error: null,
      addedToCart: false,
    };
    this.selectedAttributes = {};
    this.addedTimer = null;
  }

  async componentDidMount() {
    // TODO: check redrender x2 whyy?
    const fetchedProduct = await getProduct(this.props.productId);
    this.setState({ product: fetchedProduct });
  }

  componentDidUpdate() {
    if (this.state.addedToCart) {
      this.addedTimer = setTimeout(
        () => this.setState({ addedToCart: false }),
        1000
      );
    }
  }

  componentWillUnmount() {
    clearTimeout(this.addedTimer);
  }

  onSubmitFormHandler(event) {
    event.preventDefault();
    // check all attributes is selected && add to cart with selected attributes value
    if (
      this.state.product.attributes.length !==
      Object.keys(this.selectedAttributes).length
    ) {
      this.setState({ error: 'Must select all attributes!' });
      return;
    }

    this.context.addToCart(this.state.product, true, this.selectedAttributes);
    this.setState({ error: null, addedToCart: true });
  }

  onChangeValueHandler(event, id) {
    if (this.selectedAttributes[id]) {
      this.selectedAttributes[id].push(event.target.value);
      return;
    }
    this.selectedAttributes[id] = [event.target.value];
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
            onSubmit={(e) => this.onSubmitFormHandler(e)}
            className={classes.productContent}
          >
            <ProductTitle
              brand={this.state.product.brand}
              title={this.state.product.name}
            />
            {this.state.error && <ErrorMessage errorTxt={this.state.error} />}
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
            <Button type='submit'>
              {!this.state.addedToCart ? 'ADD TO CART' : 'ADDED!'}
            </Button>
            <div
              className={classes.description}
              dangerouslySetInnerHTML={{
                __html: `${this.state.product.description}`,
              }}
            ></div>
          </form>
        </div>
      )
    );
  }
}

export default ProductDescription;
