import React, { PureComponent } from 'react';

import classes from './ErrorMessage.module.css';

class ErrorMessage extends PureComponent {
  render() {
    return (
      <p className={`${classes.errorMessage} ${this.props.style}`}>
        {this.props.errorTxt}
      </p>
    );
  }
}

export default React.memo(ErrorMessage);
