import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRedux } from './renderWith';
import Wallet from '../../pages/Wallet';

describe('Testando o componente Header', () => {
  test('Testa se o componente Header é renderizado corretamente', () => {
    renderWithRedux(<Wallet />);

    const emailText = screen.getByTestId('email-field');
    const totalSum = screen.getByTestId('total-field');
    const currency = screen.getByTestId('header-currency-field');

    expect(emailText).toBeInTheDocument();
    expect(totalSum).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
  });
  test('Testa se o componente Header renderiza o email, valor e texto BRL', () => {
    const initialState = { 
        initialState:
        {
          user: {
            email: 'testando@teste.com',
            valor: '0',
            cambio: 'BRL',
          }
        }
    }

    renderWithRedux(<Wallet />, initialState);

    const emailText = screen.getByText(/testando@teste.com/i);
    const totalSum = screen.getByText('0.00');
    const currency = screen.getByText('BRL');

    expect(emailText).toBeInTheDocument();
    expect(totalSum).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
  });
});