import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { saveEmail } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      disableButton: true,
      redirect: false,
    };
  }

  handleChangeLogin = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validateInputs);
  }

  validateInputs = () => {
    const SIX = 6;
    const MENOS_UM = -1;
    const { username, password } = this.state;
    if (username.search(/\S+@\S+\.\S+/) !== MENOS_UM && password.length >= SIX) {
      this.setState({
        disableButton: false,
      });
    } else {
      this.setState({
        disableButton: true,
      });
    }
  }

  sendAction = () => {
    const { username } = this.state;
    const { addUserDispatch } = this.props;
    this.setState({ redirect: true });
    addUserDispatch(username);
  }

  render() {
    const { username, password, disableButton, redirect } = this.state;
    return (
      <div className="card-content">
        { redirect && <Redirect from="/" to="/carteira" />}
        <div className="card-title">
          <img src="https://cdn-0.imagensemoldes.com.br/wp-content/uploads/2020/04/Carteira-de-Dinheiro-PNG-1024x1024.png" className="img-carteira" alt="carteira" width="90" height="80" />
          <h2>TrybeWallet</h2>
        </div>
        <form className="form-login">
          <div className="card-login">
            <h3>LOGIN</h3>
            <label htmlFor="username">
              Usuário:
              <input
                className="input-usuario"
                type="email"
                placeholder="digite seu e-mail"
                onChange={ this.handleChangeLogin }
                value={ username }
                name="username"
                id="username"
                data-testid="email-input"
              />
            </label>
            <label htmlFor="password">
              Senha:
              <input
                className="input-senha"
                type="password"
                placeholder="digite sua senha"
                onChange={ this.handleChangeLogin }
                value={ password }
                name="password"
                id="password"
                data-testid="password-input"
              />
            </label>
          </div>
          <button
            type="button"
            className="button-login"
            disabled={ disableButton }
            name="login-button"
            id="login-button"
            onClick={ this.sendAction }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  addUserDispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addUserDispatch: (payload) => dispatch(saveEmail(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
