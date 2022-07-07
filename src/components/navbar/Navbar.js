import { Component } from 'react';

import NavbarList from './navbar-list/NavbarList';
import NavbarModal from './navbar-modal/NavbarModal';
import Logo from './Logo';

import classes from './Navbar.module.css';

class Navbar extends Component {
  render() {
    return (
      <div className={classes.navbar}>
        <NavbarList />
        <Logo />
        <NavbarModal />
      </div>
    );
  }
}

export default Navbar;
