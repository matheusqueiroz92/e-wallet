import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrenciesForm, saveWalletForm } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, infoForm } = this.props;
    console.log(expenses);
    return (
      infoForm
        ? <div>Carregando...</div>
        : (
          <table>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Método de pagamento</th>
                <th>Valor</th>
                <th>Moeda</th>
                <th>Câmbio utilizado</th>
                <th>Valor convertido</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  { expenses }
                </td>
                <td>
                  { expenses }
                </td>
                <td>
                  { expenses }
                </td>
                <td>
                  { expenses }
                </td>
                <td>
                  { expenses }
                </td>
              </tr>
            </tbody>
          </table>
        )
    );
  }
}

Table.propTypes = {
  currenciesForm: PropTypes.object,
  expenses: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveWalletFormDispatch: (expenses) => dispatch(saveWalletForm(expenses)),
  getCurrenciesForm: () => dispatch(fetchCurrenciesForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
