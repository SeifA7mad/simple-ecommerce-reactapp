import { Component, Fragment } from 'react';

import withRouter from '../../util/hoc/withRouter';

class Product extends Component {
  render() {
    return <div> {this.props.router.params.id} </div>;
  }
}

export default withRouter(Product);
