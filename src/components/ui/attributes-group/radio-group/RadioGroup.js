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
        readOnly={this.props.readOnly}
        defaultChecked={
          selecetedAttributes
            ? selecetedAttributes[attributeId] &&
              selecetedAttributes[attributeId] === item.value.toString()
            : false
        }
        miniCart={this.props.miniCart}
      />
    ));
    return (
      <div className={classes.radioGroup}>
        <label
          className={`${classes.radioGroupLable} ${
            this.props.miniCart ? classes.mini : null
          }`}
        >
          {this.props.miniCart
            ? this.props.attribute.name
            : this.props.attribute.name.toUpperCase()}
          :
        </label>
        <div onChange={this.props.onChange} className={classes.radioAttributes}>
          {radioButtons}
        </div>
      </div>
    );
  }
}

export default RadioGroup;
