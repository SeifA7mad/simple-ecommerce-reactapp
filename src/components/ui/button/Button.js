import { Component } from 'react';
import { Link } from 'react-router-dom';

import classes from './Button.module.css';

class Button extends Component {
  render() {
    const buttonType = {
      link: (
        <Link
          to={this.props.link}
          replace={this.props.replace}
          className={`${classes.button} ${classes.linkButton}`}
        >
          {this.props.children}
        </Link>
      ),
      submit: (
        <button
          type='submit'
          onClick={this.props.onClick}
          className={`${classes.button} ${classes.submitButton}`}
          disabled={this.props.disabled}
        >
          {this.props.children}
        </button>
      ),
    };
    return buttonType[this.props.type];
  }
}

export default Button;
