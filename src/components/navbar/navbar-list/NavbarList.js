import { Component } from 'react';

import withHTTP from '../../../util/hoc/withHTTP';

import NavbarItem from './NavbarItem';

import classes from './NavbarList.module.css';

class NavbarList extends Component {
  constructor() {
    super();
    this.state = { availableCategories: [] };
  }

  async componentDidMount() {
    this.props.http.fetchData(
      {
        query: `query {
          categories {
            name
          }
        }`,
      },
      (data) => {
        const categories = data.categories.map((c) => c.name);
        this.setState({
          availableCategories: categories,
        });
      }
    );
  }

  render() {
    const navLinks = this.state.availableCategories.map((category) => (
      <NavbarItem key={category} link={`/category/${category}`}>
        {category.toUpperCase()}
      </NavbarItem>
    ));

    return <ul className={classes.navbarList}>{navLinks}</ul>;
  }
}

export default withHTTP(NavbarList);
