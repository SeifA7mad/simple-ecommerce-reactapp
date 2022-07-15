import React, { Component } from 'react';

import classes from './Card.module.css';

class Card extends Component {
  render() {
    return (
      <div
        className={`${classes.card} ${
          this.props.active ? classes.active : null
        } ${this.props.style}`}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </div>
    );
  }
}

export default React.memo(Card);
