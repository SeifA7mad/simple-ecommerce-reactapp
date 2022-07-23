import { Component } from 'react';
import { Markup } from 'interweave';

import ProductContext from '../../../store/product-context';
import withHTTP from '../../../util/hoc/withHTTP';

import getProductPrice from '../../../util/fetch-api/getProductPrice';

import RadioGroup from '../../ui/attributes-group/radio-group/RadioGroup';
import SelectableImages from '../../ui/images-show/SelectableImages';
import ProductTitle from '../../ui/product-title/ProductTitle';
import Button from '../../ui/button/Button';

import classes from './ProductDescription.module.css';
import ErrorMessage from '../../ui/error/ErrorMessage';
import ProductPrice from '../../ui/attributes-group/product-price/ProductPrice';
import LoadingSpinner from '../../ui/loading-spinner/LoadingSpinner';

class ProductDescription extends Component {
  static contextType = ProductContext;

  constructor() {
    super();
    this.state = {
      product: null,
      addAnimation: false,
      error: null,
    };
    this.selectedAttributes = {};
    this.animationTimer = null;
  }

  componentDidMount() {
    this.props.http.fetchData(
      {
        query: `
          query {
            product(id: "${this.props.productId}") {
              id name inStock gallery brand description
              prices { amount currency{ label } }
              attributes {id name type items {id displayValue value}}
            }
          }
      `,
      },
      (data) => {
        this.setState({ product: data.product });
      }
    );
  }

  componentDidUpdate() {
    if (this.state.addAnimation) {
      this.animationTimer = setTimeout(() => {
        this.setState({ addAnimation: false });
      }, 500);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.animationTimer);
  }

  onSubmitFormHandler(event) {
    event.preventDefault();
    if (this.state.addAnimation) {
      return;
    }
    // check all attributes is selected && add to cart with selected attributes value
    if (
      this.state.product.attributes.length !==
        Object.keys(this.selectedAttributes).length &&
      !this.productInCart
    ) {
      this.setState({ error: 'Must select all attributes!' });
      return;
    }

    this.context.addToCart(this.state.product, this.selectedAttributes);
    this.setState({ error: null, addAnimation: true });
  }

  onChangeValueHandler(event, id) {
    this.selectedAttributes[id] = event.target.value;
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
      <>
        {this.props.http.isLoading && <LoadingSpinner />}
        {this.props.http.error && (
          <ErrorMessage errorTxt={this.props.http.error} />
        )}
        {this.state.product && (
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
                  productId={this.state.product.id}
                  attribute={attribute}
                  onChange={(e) => this.onChangeValueHandler(e, attribute.id)}
                  readOnly={!this.state.product.inStock}
                />
              ))}
              <section className={classes.price}>
                PRICE: <br /> <ProductPrice productPrice={productPrice} />
              </section>
              <Button disabled={!this.state.product.inStock} type='submit'>
                {this.state.addAnimation ? 'ADDED!' : 'ADD TO CART'}
              </Button>
              <Markup
                className={classes.description}
                content={this.state.product.description}
              />
            </form>
          </div>
        )}
      </>
    );
  }
}

export default withHTTP(ProductDescription);
