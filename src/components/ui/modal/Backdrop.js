import React, { PureComponent } from 'react';

import classes from './Backdrop.module.css';

class Backdrop extends PureComponent {
  render() {
    return (
      <div className={`${classes.backdrop} ${this.props.style}`} onClick={this.props.onClose}></div>
    );
  }
}

export default React.memo(Backdrop);