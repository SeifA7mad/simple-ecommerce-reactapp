import { Component } from 'react';

import SideModal from '../../ui/modal/SideModal';

// import classes from './CurrencyModal.module.css';

const dummpyCurrencies = ['USD', 'EUR', 'JPY'];

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
    this.setState({ currencies: dummpyCurrencies });
  }

  componentDidUpdate() {
    // update selectedCurrency in the context
    // if the selectedCurrency state has changed
  }

  render() {
    return (
      <SideModal>
        {this.state.currencies.map((currency, i) => (
          <p key={i}> $ {currency} </p>
        ))}
      </SideModal>
    );
  }
}

export default CurrencyModal;
