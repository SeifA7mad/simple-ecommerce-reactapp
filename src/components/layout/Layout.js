import { Component, Fragment } from 'react';

import Navbar from '../navbar/Navbar';

class Layout extends Component {
  render() {
    return (
      <Fragment>
        <header>
          <nav>
            <Navbar />
          </nav>
        </header>
        <main>{this.props.children}</main>
      </Fragment>
    );
  }
}

export default Layout;
