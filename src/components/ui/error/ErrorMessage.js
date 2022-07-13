import { Component } from 'react';

import classes from './ErrorMessage.module.css';

class ErrorMessage extends Component {
  render() {
    return <p className={`${classes.errorMessage} ${this.props.style}`}> {this.props.errorTxt} </p>;
  }
}

export default ErrorMessage;
