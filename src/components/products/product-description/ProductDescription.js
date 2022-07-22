import { Component } from 'react';
import DOMPurify from 'dompurify';

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
      error: null
    };
    this.selectedAttributes = {};
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

  onSubmitFormHandler(event) {
    event.preventDefault();
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
    this.setState({ error: null });
  }

  onRemoveFromCartHandler() {
    this.context.removeFromCart(this.state.product.id, true);
  }

  onChangeValueHandler(event, id) {
    this.selectedAttributes[id] = event.target.value;
  }

  render() {
    let productPrice = null;
    let productInCart = false;
    if (this.state.product) {
      productPrice = getProductPrice(
        this.state.product.prices,
        this.context.selectedCurrency
      );
      productInCart = this.context.cart.hasOwnProperty(this.state.product.id);
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
                />
              ))}
              <section className={classes.price}>
                Price: <br /> <ProductPrice productPrice={productPrice} />
              </section>
              {this.state.product.inStock && (
                <Button type='submit'>ADD TO CART</Button>
              )}
              {productInCart && (
                <Button
                  type='button'
                  style={classes.inCartButton}
                  onClick={this.onRemoveFromCartHandler.bind(this)}
                >
                  REMOVE ALL FROM CART
                </Button>
              )}
              <section
                className={classes.description}
                dangerouslySetInnerHTML={{
                  __html: `${DOMPurify.sanitize(this.state.product.description)}`,
                }}
              ></section>
            </form>
          </div>
        )}
      </>
    );
  }
}

export default withHTTP(ProductDescription);
