import { Component } from 'react';

import ProductContext from '../../../store/product-context';
import withHTTP from '../../../util/hoc/withHTTP';

import SideModal from '../../ui/modal/SideModal';

import classes from './CurrencyModal.module.css';

class CurrencyModal extends Component {
  static contextType = ProductContext;

  constructor() {
    super();
    this.state = {
      currencies: [],
    };
  }

  componentDidMount() {
    this.props.http.fetchData(
      {
        query: `query {
                currencies {label symbol}
              }`,
      },
      (data) => this.setState({ currencies: data.currencies })
    );
  }

  onChangeSelectedCurrencyHandler(currency) {
    this.context.changeCurrency(currency);
    this.props.onClose();
  }

  render() {
    return (
      <SideModal onClose={this.props.onClose}>
        {this.state.currencies.map((currency, i) => (
          <p
            key={i}
            onClick={() => this.onChangeSelectedCurrencyHandler(currency)}
            className={
              this.context.selectedCurrency.label === currency.label
                ? classes.active
                : null
            }
          >
            {currency.symbol} {currency.label}
          </p>
        ))}
      </SideModal>
    );
  }
}

export default withHTTP(CurrencyModal);
