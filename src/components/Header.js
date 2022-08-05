import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;

    const mapExchange = (expenses.map((el) => {
      const { currency, exchangeRates, value } = el;
      return (exchangeRates[currency].ask) * value;
    })).reduce((acc, curr) => acc + curr, 0);
    return (
      <div className="header-info">
        <div className="e-mail">
          <p data-testid="email-field">
            E-mail:
            &nbsp;
            { email }
            &nbsp;
          </p>
        </div>
        <div className="valor-cambio">
          <p>
            Despesa Total: R$
            <span data-testid="total-field">
              { mapExchange.toFixed(2) }
            </span>
          </p>
          <p data-testid="header-currency-field">
            &nbsp;
            BRL
          </p>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  ask: PropTypes.array,
  expenses: PropTypes.array,
  exchangeRates: PropTypes.array,
  currency: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currency: state.wallet.currency,
  exchangeRates: state.wallet.exchangeRates,
  ask: state.wallet.ask,
});

export default connect(mapStateToProps)(Header);
