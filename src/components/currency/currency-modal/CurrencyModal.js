import { Component } from 'react';

import Modal from '../../ui/modal/Modal';

import classes from './CurrencyModal.module.css';

const dummpyCurrencies = ['USD', 'EUR', 'JPY']

class CurrencyModal extends Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
      selectedCurrency: null,
    };
  }

  componentDidMount() {
    // fetch currenies
    this.setState({ currencies: dummpyCurrencies});
  }

  componentDidUpdate() {
    // update selectedCurrency in the context
    // if the selectedCurrency state has changed
  }

  render() {
    return (
      <Modal style={classes.currencyModal}>
        <div className={classes.currencyModalContent}>
          {this.state.currencies.map((currency, i) => <p key={i}> $ {currency} </p>)}
        </div>
      </Modal>
    );
  }
}

export default CurrencyModal;
