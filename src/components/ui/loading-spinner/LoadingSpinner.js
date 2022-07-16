import React, { Component } from 'react';

import classes from './LoadingSpinner.module.css';

class LoadingSpinner extends Component {
  render() {
    return (
      <div className={classes.spinner}>
        <div className={classes.double_bounce1}></div>
        <div className={classes.double_bounce2}></div>
      </div>
    );
  }
}

export default React.memo(LoadingSpinner);
