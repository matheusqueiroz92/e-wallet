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

  handleChange = ({ target }) => {
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
      <div>
        { redirect && <Redirect from="/" to="/carteira" />}
        <div className="title-login">Login</div>
        <form className="form-login">
          <label htmlFor="username">
            Usuário
            <input
              type="text"
              onChange={ this.handleChange }
              value={ username }
              name="username"
              id="username"
              data-testid="email-input"
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              type="password"
              onChange={ this.handleChange }
              value={ password }
              name="password"
              id="password"
              data-testid="password-input"
            />
          </label>
        </form>
        <button
          type="submit"
          disabled={ disableButton }
          name="login-button"
          id="login-button"
          onClick={ this.sendAction }
        >
          Entrar
        </button>
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
