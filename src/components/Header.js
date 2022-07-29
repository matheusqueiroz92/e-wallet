import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, valor, cambio } = this.props;
    return (
      <div className="header-info">
        <div>
          <p data-testid="email-field">
            { `E-mail: ${email}` }
          </p>
        </div>
        <div className="valor-cambio">
          <p data-testid="total-field">
            { `Despesa Total: R$ ${valor}` }
            &nbsp;
          </p>
          <p data-testid="header-currency-field">
            { `${cambio}` }
          </p>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  valor: PropTypes.number.isRequired,
  cambio: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  valor: state.user.valor,
  cambio: state.user.cambio,
});

export default connect(mapStateToProps)(Header);
