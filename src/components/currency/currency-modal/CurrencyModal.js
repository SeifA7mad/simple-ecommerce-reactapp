import { Component } from 'react';

import Modal from '../../ui/modal/Modal';

import classes from './CurrencyModal.module.css';

class CurrencyModal extends Component {
  render() {
    return <Modal style={classes.currencyModal}>CurrencyModal</Modal>;
  }
}

export default CurrencyModal;
