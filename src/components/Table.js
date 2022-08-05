import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../redux/actions';

class Table extends Component {
  handleClick = (targetId) => {
    const { expenses, deleteExpenseDispatch } = this.props;
    console.log(targetId);
    const expensesSelected = expenses.filter((element) => element.id !== targetId);
    console.log(expensesSelected);
    deleteExpenseDispatch(expensesSelected);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense) => {
            const { currency, exchangeRates, value } = expense;
            return (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ parseFloat(expense.value).toFixed(2) }</td>
                <td>{ exchangeRates[currency].name }</td>
                <td>{ parseFloat(exchangeRates[currency].ask).toFixed(2) }</td>
                <td>
                  R$
                  { ((exchangeRates[currency].ask) * value).toFixed(2) }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    id={ expense.id }
                    data-testid="edit-btn"
                    onClick={ () => {} }
                  >
                    Editar
                  </button>
                  /
                  <button
                    id={ expense.id }
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleClick(expense.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>);
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseDispatch: (expensesSelected) => dispatch(deleteExpense(expensesSelected)),
});

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
