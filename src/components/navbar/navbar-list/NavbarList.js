import { Component } from 'react';

import NavbarItem from './NavbarItem';

import classes from './NavbarList.module.css';

class NavbarList extends Component {
  render() {
    return (
      <ul className={classes.navbarList}>
        <NavbarItem link='/category/women'>WOMEN</NavbarItem>
        <NavbarItem link='/category/men'>MEN</NavbarItem>
        <NavbarItem link='/category/kids'>KIDS</NavbarItem>
      </ul>
    );
  }
}

export default NavbarList;
