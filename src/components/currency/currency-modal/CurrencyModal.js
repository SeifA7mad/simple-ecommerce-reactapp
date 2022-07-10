import { Component } from 'react';

import ProductContext from '../../../store/product-context';

import SideModal from '../../ui/modal/SideModal';

// import classes from './CurrencyModal.module.css';

class CurrencyModal extends Component {
  static contextType = ProductContext;

  constructor() {
    super();
    this.state = {
      currencies: [],
      selectedCurrency: null,
    };
  }

  async fetchCurrencies() {
    const graphqlQuery = {
      query: `query {
                currencies {label symbol}
              }`,
    };

    try {
      const response = await fetch('http://localhost:4000', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(graphqlQuery),
      });

      const resData = await response.json();

      this.setState({ currencies: resData.data.currencies });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  onChangeSelectedCurrencyHandler(currency) {
    this.context.changeCurrency(currency);
  }

  render() {
    return (
      <SideModal>
        {this.state.currencies.map((currency, i) => (
          <p
            key={i}
            onClick={() => this.onChangeSelectedCurrencyHandler(currency)}
          >
            {currency.symbol} {currency.label}
          </p>
        ))}
      </SideModal>
    );
  }
}

export default CurrencyModal;
