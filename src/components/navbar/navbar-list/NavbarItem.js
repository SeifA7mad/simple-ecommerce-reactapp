import { Component } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavbarItem.module.css';

class NavbarItem extends Component {
  render() {
    return (
      <li className={classes.navbarItem}>
        <NavLink
          to={this.props.link}
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          {this.props.children}
        </NavLink>
      </li>
    );
  }
}

export default NavbarItem;
