import { Component } from 'react';

import RadioButton from '../radio-button/RadioButton';

import classes from './RadioGroup.module.css';

class RadioGroup extends Component {
  render() {
    const radioButtons = this.props.attribute.items.map((item) => (
      <RadioButton
        key={item.id}
        type={this.props.attribute.type}
        value={item.value}
        name={this.props.attribute.name}
        id={`${this.props.attribute.id}${item.id}`}
      />
    ));
    return (
      <div className={classes.radioGroup}>
        <label className={classes.radioGroupLable}> {this.props.attribute.name}: </label>
        <div onChange={this.props.onChange} className={classes.radioAttributes}>{radioButtons}</div>
      </div>
    );
  }
}

export default RadioGroup;
