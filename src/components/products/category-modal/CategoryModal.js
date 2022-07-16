import { Component } from 'react';

import withHTTP from '../../../util/hoc/withHTTP';

import SideModal from '../../ui/modal/SideModal';

import classes from './CategoryModal.module.css';

class CategoryModal extends Component {
  constructor() {
    super();
    this.state = { availableCategories: [] };
  }

  async componentDidMount() {
    const graphqlQuery = {
      query: `query {
          categories {
            name
          }
        }`,
    };

    this.props.http.fetchData(graphqlQuery, (data) => {
      const categories = data.categories.map((c) => c.name);
      this.setState({
        availableCategories: categories,
      });
    });
  }

  render() {
    const categoriesModalContent = this.state.availableCategories.map(
      (categoryName, i) => (
        <p key={i} onClick={() => this.props.onChangeCatgeory(categoryName)}>
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

export default withHTTP(CategoryModal);
