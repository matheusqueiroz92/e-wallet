import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    console.log(expenses);
    return (
      <table>
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
        { expenses.map((expense, index) => (
          <tr key={ index }>
            <td>{ expense.description }</td>
            <td>{ expense.tag }</td>
            <td>{ expense.method }</td>
            <td>{ expense.value }</td>
            <td>{ expense.currency }</td>
            <td>Valor</td>
            <td>Convertido</td>
            <td>Moeda de conversão</td>
            <td>Editar/Excluir</td>
          </tr>))}
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

export default Table;
