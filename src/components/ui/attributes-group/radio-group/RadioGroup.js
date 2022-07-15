import { Component } from 'react';

import RadioButton from '../radio-button/RadioButton';

import classes from './RadioGroup.module.css';

class RadioGroup extends Component {
  render() {
    const attributeId = this.props.attribute.id;
    const selecetedAttributes = this.props.selectedAttributes;

    const radioButtons = this.props.attribute.items.map((item) => (
      <RadioButton
        key={item.id}
        type={this.props.attribute.type}
        value={item.value}
        name={this.props.attribute.name}
        id={`${this.props.productId}_${attributeId}`}
        itemId={item.id}
        defaultChecked={
          selecetedAttributes
            ? selecetedAttributes[attributeId] &&
              selecetedAttributes[attributeId][
                selecetedAttributes[attributeId].length - 1
              ] === item.value.toString()
            : false
        }
      />
    ));
    return (
      <div className={classes.radioGroup}>
        <label className={classes.radioGroupLable}>
          {this.props.attribute.name}:
        </label>
        <div onChange={this.props.onChange} className={classes.radioAttributes}>
          {radioButtons}
        </div>
      </div>
    );
  }
}

export default RadioGroup;
