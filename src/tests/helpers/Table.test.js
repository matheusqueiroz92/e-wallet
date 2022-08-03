import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRedux, renderWithRouterAndRedux } from './renderWith';
import userEvent from '@testing-library/user-event';
import Wallet from '../../pages/Wallet';
import mockData from './mockData';
import WalletForm from '../../components/WalletForm';

const initialState = {
  initialState:
  {
    wallet: {
      currencies: [],
      expenses: [],
      totalCost: 0,
    },
  }
};

describe('Testa o componente WalletForm', () => {
  test('Testa se o componente é renderizado como o Header de uma tabela correto', () => {
    renderWithRedux(<WalletForm />)

    const description = screen.getAllByText(/descrição/i);
    const tag = screen.getAllByText(/tag/i);
    const method = screen.getAllByText(/método de pagamento/i);
    const value = screen.getAllByText(/valor/i);
    const coin = screen.getAllByText(/moeda/i);
    const cambio = screen.getAllByText(/câmbio utilizado/i);
    const convertedValue = screen.getByText(/valor convertido/i);
    // const convertedCoin = screen.getAllByText(/moeda de conversão/i);
    // const editDel = screen.getByRole('rowheader', { name: 'Editar/Excluir' });

    [description, tag, method, cambio, convertedValue].forEach((el) => {
        expect(el).toBeInTheDocument();
      });
    expect(value && coin).toHaveLength(2);
  });
  test('Se ao clicar no botao de excluir, a row de expenses é excluida', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
      ok: true, 
     });

    const { store } = renderWithRouterAndRedux(<Wallet />, 
      { initialPath: '/carteira', initialState });
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const valueInput = screen.getByLabelText('Valor:');
    const descriptionInput = screen.getByLabelText('Description:');
    const coin = screen.getByTestId('currency-input');
    const method = screen.getByLabelText('Método de pagamento:');
    const category = screen.getByLabelText('Categoria:');
    const totalCost = screen.getByTestId('total-field');

    userEvent.type(valueInput, '10');
    userEvent.type(descriptionInput, 'Dez dólares');
    userEvent.selectOptions(coin, 'USD');
    userEvent.selectOptions(method, 'Cartão de débito');
    userEvent.selectOptions(category, 'Trabalho');

    const addExpenseBtn = screen.getByRole('button', { name: /Adicionar despesa/i });
    userEvent.click(addExpenseBtn);
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const description = screen.getByRole('cell', { name: /dez dólares/i });
    const tag = screen.getByRole('cell', { name: /trabalho/i });
    const payment = screen.getByRole('cell', { name: /cartão de débito/i });
    const showValue = screen.getByRole('cell', { name: /10.00/i });
    const showCoin = screen.getByRole('cell', { name: 'Dólar Americano/Real Brasileiro' });
    const convertCoin = screen.getByRole('cell', { name: 'Real' });
    const usedCamb = screen.getByRole('cell', { name: /4.75/i });
    const convertValue = screen.getByRole('cell', { name: /47.53/i });
    const editBtn = screen.getByTestId('edit-btn');
    const delBtn = screen.getByTestId('delete-btn');

    const tableArr = [description, tag, payment, showValue, usedCamb,
      convertValue, editBtn, delBtn, convertCoin, showCoin];

    tableArr.forEach((el) => expect(el).toBeInTheDocument());
    expect(totalCost).toHaveTextContent(47.53);

    userEvent.click(delBtn);
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    tableArr.forEach((el) => expect(el).not.toBeInTheDocument());
    expect(totalCost).toHaveTextContent(0);
  });
  test('Se ao clicar no botao de excluir, a row de expenses é excluida', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
      ok: true, 
     });

    const { store } = renderWithRouterAndRedux(<Wallet />, 
      { initialPath: '/carteira', initialState });
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const valueInput = screen.getByLabelText('Valor:');
    const descriptionInput = screen.getByLabelText('Description:');
    const coin = screen.getByTestId('currency-input');
    const method = screen.getByLabelText('Método de pagamento:');
    const category = screen.getByLabelText('Categoria:');
    const totalCost = screen.getByTestId('total-field');

    userEvent.type(valueInput, '10');
    userEvent.type(descriptionInput, 'Dez dólares');
    userEvent.selectOptions(coin, 'USD');
    userEvent.selectOptions(method, 'Cartão de débito');
    userEvent.selectOptions(category, 'Trabalho');

    const addExpenseBtn = screen.getByRole('button', { name: /Adicionar despesa/i });
    userEvent.click(addExpenseBtn);
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const description = screen.getByRole('cell', { name: /dez dólares/i });
    const tag = screen.getByRole('cell', { name: /trabalho/i });
    const payment = screen.getByRole('cell', { name: /cartão de débito/i });
    const showValue = screen.getByRole('cell', { name: /10.00/i });
    const showCoin = screen.getByRole('cell', { name: 'Dólar Americano/Real Brasileiro' });
    const convertCoin = screen.getByRole('cell', { name: 'Real' });
    const usedCamb = screen.getByRole('cell', { name: /4.75/i });
    const convertValue = screen.getByRole('cell', { name: /47.53/i });
    const editBtn = screen.getByTestId('edit-btn');
    const delBtn = screen.getByTestId('delete-btn');

    const tableArr = [description, tag, payment, showValue, usedCamb,
      convertValue, editBtn, delBtn, convertCoin, showCoin];

    tableArr.forEach((el) => expect(el).toBeInTheDocument());
    expect(totalCost).toHaveTextContent(47.53);

    userEvent.click(editBtn);
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    tableArr.forEach((el) => expect(el).not.toBeInTheDocument());
    expect(totalCost).toHaveTextContent(0);

    userEvent.type(valueInput, '20');
    userEvent.type(descriptionInput, 'Vinte euros');
    userEvent.selectOptions(coin, 'EUR');
    userEvent.selectOptions(method, 'Cartão de débito');
    userEvent.selectOptions(category, 'Trabalho');

    const addEditedExpenseBtn = screen.getByRole('button', { name: /Editar despesa/i });
    userEvent.click(addEditedExpenseBtn);
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const editDescription = screen.getByRole('cell', { name: /vinte euros/i });
    const editTag = screen.getByRole('cell', { name: /trabalho/i });
    const editPayment = screen.getByRole('cell', { name: /cartão de débito/i });
    const editShowValue = screen.getByRole('cell', { name: /20.00/i });
    const editShowCoin = screen.getByRole('cell', { name: 'Euro/Real Brasileiro' });
    const editConvertCoin = screen.getByRole('cell', { name: 'Real' });
    const editUsedCamb = screen.getByRole('cell', { name: /5.13/i });
    const editConvertValue = screen.getByRole('cell', { name: /102.54/i });

    const editedTableArr = [editDescription, editTag, editPayment, editShowValue, editShowCoin,
      editConvertCoin, editUsedCamb, editConvertValue];
    editedTableArr.forEach((el) => expect(el).toBeInTheDocument());
    expect(totalCost).toHaveTextContent(102.54);
  });
});