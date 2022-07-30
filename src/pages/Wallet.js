import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });
    const { getCurrencies } = this.props;
    getCurrencies();
    this.setState({
      loading: false,
    });
  }

  render() {
    const { loading } = this.state;
    return (
      loading
        ? <div>Carregando...</div>
        : (
          <div>
            <Header />
            <WalletForm />
          </div>
        )
    );
  }
}

Wallet.propTypes = {
  getCurrencies: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
});

export default connect(null, mapDispatchToProps)(Wallet);
