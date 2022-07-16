import { Component } from 'react';

import SideModal from '../../ui/modal/SideModal';

import classes from './CategoryModal.module.css';

class CategoryModal extends Component {
  constructor() {
    super();
    this.state = { availableCategories: [] };
  }

  async fetchCategories() {
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
      });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.fetchCategories();
  }

  render() {
    const categoriesModalContent = this.state.availableCategories.map(
      (categoryName, i) => (
        <p
          key={i}
          onClick={() => this.props.onChangeCatgeory(categoryName)}
        >
          {categoryName}
        </p>
      )
    );

    return (
      <SideModal
        backdropStyle={classes.backdrop}
        onClose={this.props.onClose}
        style={classes.categoryModal}
      >
        {categoriesModalContent}
      </SideModal>
    );
  }
}

export default CategoryModal;
