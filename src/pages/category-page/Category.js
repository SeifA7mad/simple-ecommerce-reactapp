import { Component, Fragment } from 'react';

import withRouter from '../../util/hoc/withRouter';

import PageTitle from '../../components/ui/page-title/PageTitle';
import ProductList from '../../components/products/product-list/ProductList';

class Category extends Component {
  render() {
    const categoryType = this.props.router.params.categoryType;
    return (
      <Fragment>
        <PageTitle title={categoryType} />
        <ProductList categoryName={categoryType} />
      </Fragment>
    );
  }
}

export default withRouter(Category);
