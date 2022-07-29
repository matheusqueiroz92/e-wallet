import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });
    const { currencies, getCurrencies } = this.props;
    console.log(currencies);
    getCurrencies();
    const array = Object.keys(currencies);
    this.setState({
      currencies: array,
      loading: false,
    });
  }

  render() {
    const { currencies, loading } = this.state;
    console.log(loading);
    return (
      <div>
        { loading
          ? <h1>Loading...</h1>
          : (
            <form>
              <label htmlFor="valor">
                Valor:
                <input
                  type="number"
                  name="valor"
                  id="valor"
                  value="valor"
                  onChange={ () => {} }
                  data-testid="value-input"
                />
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
              <label htmlFor="moeda">
                Moeda:
                <select
                  name="moeda"
                  id="moeda"
                  onChange={ () => {} }
                  value="valor"
                  data-testid="method-input"
                >
                  { currencies.map(
                    (moeda, index) => <option key={ index }>{ moeda }</option>,
                  ) }
                </select>
              </label>
            </form>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
});

WalletForm.propTypes = {
  getCurrencies: PropTypes.func,
  currencies: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
