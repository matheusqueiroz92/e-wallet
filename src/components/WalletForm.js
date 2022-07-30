import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletForm extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isloading: false,
  //   };
  // }

  render() {
    const { currencies, isloading } = this.props;
    console.log(currencies);
    return (
      isloading
        ? <div>Carregando...</div>
        : (
          <div>
            <form>
              <label htmlFor="valor">
                Valor:
                <input
                  type="number"
                  name="valor"
                  id="valor"
                  value=""
                  onChange={ () => {} }
                  data-testid="value-input"
                />
              </label>
              <label htmlFor="moeda">
                Moeda:
                <select
                  name="moeda"
                  id="moeda"
                  onChange={ () => {} }
                  value="valor"
                  data-testid="currency-input"
                >
                  { currencies.map(
                    (moeda, index) => (<option key={ index }>{ moeda }</option>),
                  ) }
                </select>
              </label>
              <label htmlFor="method">
                Método de pagamento
                <select
                  name="method"
                  id="method"
                  onChange={ () => {} }
                  value="valor"
                  data-testid="method-input"
                >
                  <option>Dinheiro</option>
                  <option>Cartão de crédito</option>
                  <option>Cartão de débito</option>
                </select>
              </label>
              <label htmlFor="method">
                Categoria
                <select
                  name="method"
                  id="method"
                  onChange={ () => {} }
                  value="valor"
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
                  value=""
                  onChange={ () => {} }
                  data-testid="description-input"
                />
              </label>
            </form>
          </div>
        )
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.array,
  isloading: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, null)(WalletForm);
