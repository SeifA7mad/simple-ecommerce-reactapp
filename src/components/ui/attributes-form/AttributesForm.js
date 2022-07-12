import { Component } from 'react';
import RadioGroup from './radio-group/RadioGroup';

import classes from './AttributesForm.module.css';

class AttributesForm extends Component {
  onChangeValueHandler(e, id) {
    // console.log(id);
  }

  render() {
    const attributesGroup = this.props.attributes.map((attribute) => (
      <RadioGroup
        key={attribute.id}
        attribute={attribute}
        onChange={(e) => this.onChangeValueHandler(e, attribute.id)}
      />
    ));
    return <form>{attributesGroup}</form>;
  }
}

export default AttributesForm;
