import React, { Component } from 'react';

import classes from './RadioButton.module.css';

class RadioButton extends Component {
  render() {
    const radioType = {
      text: (
        <div className={`${classes.radioContainer}`}>
          <input
            className={`${classes.radioButton} ${
              this.props.miniCart ? classes.mini : null
            }`}
            type='radio'
            name={this.props.id}
            value={this.props.value}
            id={`${this.props.id}_${this.props.itemId}`}
            disabled={this.props.readOnly}
            defaultChecked={this.props.defaultChecked}
          />
          <label
            className={`${this.props.miniCart ? classes.mini : null}`}
            htmlFor={`${this.props.id}_${this.props.itemId}`}
          >
            {this.props.value}
          </label>
        </div>
      ),
      swatch: (
        <input
          className={`${classes.radioButton} ${classes.swatch} ${
            this.props.miniCart ? classes.mini : null
          }`}
          type='radio'
          name={this.props.id}
          value={this.props.value}
          style={{ backgroundColor: `${this.props.value}` }}
          disabled={this.props.readOnly}
          defaultChecked={this.props.defaultChecked}
        />
      ),
    };
    return radioType[this.props.type];
  }
}

export default React.memo(RadioButton);
