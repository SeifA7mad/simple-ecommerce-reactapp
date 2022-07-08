import { Component, Fragment } from 'react';

import withRouter from '../../util/hoc/withRouter';

import PageTitle from '../../components/ui/page-title/PageTitle';

class Category extends Component {
  render() {
    return (
      <Fragment>
        <PageTitle>{this.props.router.params.categoryName}</PageTitle>
      </Fragment>
    );
  }
}

export default withRouter(Category);
