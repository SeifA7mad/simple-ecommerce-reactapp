import React, { Component } from 'react';

import classes from './RadioButton.module.css';

class RadioButton extends Component {
  render() {
    const radioType = {
      text: (
        <div className={`${classes.radioContainer}`}>
          <input
            className={`${classes.radioButton}`}
            type='radio'
            name={this.props.id}
            value={this.props.value}
            id={`${this.props.id}_${this.props.itemId}`}
            defaultChecked={this.props.checked}
          />
          <label htmlFor={`${this.props.id}_${this.props.itemId}`}>
            {this.props.value}
          </label>
        </div>
      ),
      swatch: (
        <input
          className={`${classes.radioButton} ${classes.swatch}`}
          type='radio'
          name={this.props.name}
          value={this.props.value}
          style={{ backgroundColor: `${this.props.value}` }}
          defaultChecked={this.props.checked}
        />
      ),
    };
    return radioType[this.props.type];
  }
}

export default React.memo(RadioButton);
