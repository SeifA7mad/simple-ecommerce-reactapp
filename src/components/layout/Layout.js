import { Component, Fragment } from 'react';

import Navbar from '../navbar/Navbar';

import classes from './Layout.module.css';

class Layout extends Component {
  render() {
    return (
      <Fragment>
        <header>
          <nav className={classes.nav}>
            <Navbar />
          </nav>
        </header>
        <main className={classes.main}>{this.props.children}</main>
      </Fragment>
    );
  }
}

export default Layout;
