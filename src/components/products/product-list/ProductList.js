import React, { Component } from 'react';
import ProductItem from '../product-item/ProductItem';

import ProductContext from '../../../store/product-context';

import getProduct from '../../../util/fetch-api/getProduct';
import getProductPrice from '../../../util/fetch-api/getProductPrice';

import Modal from '../../ui/modal/Modal';
import RadioGroup from '../../ui/attributes-group/radio-group/RadioGroup';
import Button from '../../ui/button/Button';
import ErrorMessage from '../../ui/error/ErrorMessage';

import classes from './ProductList.module.css';

class ProductList extends Component {
  static contextType = ProductContext;

  constructor() {
    super();
    this.state = {
      products: [],
      product: null,
      isModalShown: false,
      loading: false,
      error: null
    };
    this.selectedAttributes = {};
  }

  async fetchProducts(categoryName) {
    // get product category this.props.category
    // fetch products from API based on category type
    const graphqlQuery = {
      query: `
        query {
          category(input: {title: "${categoryName}"}) {
            products {
              id name inStock gallery brand 
              prices { amount currency{ label } }
          }}
        }
      `,
    };
    try {
      const response = await fetch('http://localhost:4000', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(graphqlQuery),
      });

      if (!response.ok) return;

      const resData = await response.json();

      this.setState({ products: resData.data.category.products });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.fetchProducts(this.props.categoryName);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.categoryName !== this.props.categoryName) {
      this.fetchProducts(this.props.categoryName);
    }
  }

  onRemoveFromCartHandler(id) {
    this.context.removeFromCart(id, true);
  }

  async onShowModalHandler(productId) {
    this.selectedAttributes = {};
    if (!this.state.product || this.state.product !== productId) {
      const fetchedProduct = await getProduct(productId);
      this.setState({ product: fetchedProduct, isModalShown: true });
      return;
    }

    this.setState({ isModalShown: true });
  }

  onHideModalHandler() {
    this.setState({ isModalShown: false });
  }

  onChangeValueHandler(event, id) {
    this.selectedAttributes[id] = event.target.value;
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
    this.setState({ error: null, isModalShown: false });
  }

  isProductInCartHandler(id) {
    return this.context.cart.hasOwnProperty(id);
  }

  render() {
    // map on products to output productItems
    const productItems = this.state.products.map((product) => (
      <ProductItem
        id={product.id}
        key={product.id}
        name={product.name}
        price={getProductPrice(product.prices, this.context.selectedCurrency)}
        img={product.gallery[0]}
        isOutOfStock={!product.inStock}
        isAddedToCart={this.isProductInCartHandler(product.id)}
        onRemoveFromCart={this.onRemoveFromCartHandler.bind(this, product.id)}
        onShowModal={this.onShowModalHandler.bind(this, product.id)}
      />
    ));

    return (
      <>
        <div className={classes.productList}>{productItems}</div>
        {this.state.isModalShown && (
          <Modal style={classes.attributesModal} onClose={this.onHideModalHandler.bind(this)}>
            <form
              className={classes.attributesForm}
              onSubmit={this.onSubmitFormHandler.bind(this)}
            >
              {this.state.error && <ErrorMessage errorTxt={this.state.error} />}
              {this.state.product.attributes.map((attribute) => (
                <RadioGroup
                  key={attribute.id}
                  productId={this.state.product.id}
                  selectedAttributes={
                    this.context.cart[this.state.product.id]
                      ? this.context.cart[this.state.product.id]
                          .selectedAttributes
                      : null
                  }
                  attribute={attribute}
                  onChange={(e) => this.onChangeValueHandler(e, attribute.id)}
                />
              ))}
              <Button type='submit'> ADD TO CART! </Button>
            </form>
          </Modal>
        )}
      </>
    );
  }
}

export default React.memo(ProductList);
