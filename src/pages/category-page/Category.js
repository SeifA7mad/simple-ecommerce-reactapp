import { Component, Fragment } from 'react';

import withRouter from '../../util/hoc/withRouter';

import PageTitle from '../../components/ui/page-title/PageTitle';
import ProductList from '../../components/products/product-list/ProductList';

class Category extends Component { 
  render() {
    const categoryName = this.props.router.params.categoryName;
    return (
      <Fragment>
        <PageTitle title={categoryName} />
        <ProductList categoryType={categoryName} />
      </Fragment>
    );
  }
}

export default withRouter(Category);
