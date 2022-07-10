import { Component, Fragment } from 'react';

// import withRouter from '../../util/hoc/withRouter';

import PageTitle from '../../components/ui/page-title/PageTitle';
import ProductList from '../../components/products/product-list/ProductList';
import SideModal from '../../components/ui/modal/SideModal';

import classes from './Category.module.css';

class Category extends Component {
  constructor() {
    super();
    this.state = {
      availableCategories: [],
      selectedCategory: null,
      showCategoryModal: false,
    };
  }

  async componentDidMount() {
    const graphqlQuery = {
      query: `query {
          categories {
            name
          }
        }`,
    };

    try {
      const response = await fetch('http://localhost:4000', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(graphqlQuery),
      });

      const resData = await response.json();

      const categories = resData.data.categories.map((c) => c.name);

      this.setState({
        availableCategories: categories,
        selectedCategory: categories[0],
      });
    } catch (err) {
      console.log(err);
    }
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
    const categoriesModalContent = this.state.availableCategories.map(
      (categoryName, i) => (
        <p
          key={i}
          onClick={() => this.onChangeSelectedCatgeoryHandler(categoryName)}
        >
          {categoryName}
        </p>
      )
    );

    return (
      <Fragment>
        {this.state.selectedCategory && (
          <PageTitle
            title={this.state.selectedCategory}
            onClick={() => this.onToggleModalHandler(this)}
            isModalOpen={this.state.showCategoryModal}
            style={{ cursor: 'pointer' }}
          />
        )}
        {this.state.showCategoryModal && (
          <SideModal style={classes.categoryModal}>
            {categoriesModalContent}
          </SideModal>
        )}
        <ProductList categoryType={'categoryName'} />
      </Fragment>
    );
  }
}

export default Category;
