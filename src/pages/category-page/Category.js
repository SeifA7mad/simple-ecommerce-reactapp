import { Component, Fragment } from 'react';

// import withRouter from '../../util/hoc/withRouter';

import PageTitle from '../../components/ui/page-title/PageTitle';
import ProductList from '../../components/products/product-list/ProductList';
import CategoryModal from '../../components/products/category-modal/CategoryModal';

class Category extends Component {
  constructor() {
    super();
    this.state = {
      selectedCategory: 'all',
      showCategoryModal: false,
    };
  }

  onToggleModalHandler() {
    this.setState((prevState) => {
      return { showCategoryModal: !prevState.showCategoryModal };
    });
  }

  onChangeSelectedCatgeoryHandler(categoryName) {
    this.setState({
      selectedCategory: categoryName,
      showCategoryModal: false,
    });
  }

  render() {
    return (
      <Fragment>
        <PageTitle
          title={this.state.selectedCategory}
          onClick={this.onToggleModalHandler.bind(this)}
          isModalOpen={this.state.showCategoryModal}
        />
        {this.state.showCategoryModal && (
          <CategoryModal
            onChangeCatgeory={this.onChangeSelectedCatgeoryHandler.bind(this)}
          />
        )}
        <ProductList categoryName={this.state.selectedCategory} />
      </Fragment>
    );
  }
}

export default Category;
