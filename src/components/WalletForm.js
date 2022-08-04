import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveWalletForm, fetchCurrenciesForm } from '../redux/actions';
import Table from './Table';

const TAG = 'Alimentação';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: TAG,
      description: '',
    };
  }

  handleChangeWallet = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  clearInputs = () => {
    const { saveWalletFormDispatch } = this.props;
    saveWalletFormDispatch(this.state);
    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: TAG,
      description: '',
    });
  }

  sendWalletForm = async () => {
    const { getCurrenciesForm } = this.props;
    await getCurrenciesForm();
    const { exchangeRates, expenses } = this.props;
    this.setState({
      exchangeRates,
      id: (expenses.length),
    }, this.clearInputs);
  }

  render() {
    const { currencies, expenses } = this.props;
    const { value, currency, method, tag, description } = this.state;
    return (
      <div>
        <form className="form">
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              name="value"
              id="value"
              value={ value }
              onChange={ this.handleChangeWallet }
              data-testid="value-input"
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              id="currency"
              onChange={ this.handleChangeWallet }
              value={ currency }
              data-testid="currency-input"
            >
              { currencies.map(
                (moedaOp, index) => (<option key={ index }>{ moedaOp }</option>),
              ) }
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              name="method"
              id="method"
              onChange={ this.handleChangeWallet }
              value={ method }
              data-testid="method-input"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              name="tag"
              id="tag"
              onChange={ this.handleChangeWallet }
              value={ tag }
              data-testid="tag-input"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <textarea
              type="text-area"
              rows="2"
              name="description"
              id="description"
              value={ description }
              onChange={ this.handleChangeWallet }
              data-testid="description-input"
            />
          </label>
        </form>
        <button
          className="button"
          type="submit"
          name="buttonAdd"
          id="buttonAdd"
          onClick={ this.sendWalletForm }
        >
          Adicionar despesa
        </button>
        <Table expenses={ expenses } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  exchangeRates: state.wallet.exchangeRates,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveWalletFormDispatch: (expenses) => dispatch(saveWalletForm(expenses)),
  getCurrenciesForm: () => dispatch(fetchCurrenciesForm()),
});

WalletForm.propTypes = {
  currencies: PropTypes.array,
  exchangeRates: PropTypes.object,
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
