import { Component } from 'react';

import classes from './Button.module.css';

class Button extends Component {
  render() {
    const buttonType = {
      link: (
        <a href={this.props.link} className={classes.button}>
          {this.props.children}
        </a>
      ),
      submit: (
        <button
          type='submit'
          onClick={this.props.onClick}
          className={classes.button}
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
