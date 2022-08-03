import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';

describe('Testando o component Login', () => {
  test('Testa se existe o input de Usuário, Senha e um botão desabilitado com o texto Entrar', () => {
    renderWithRouterAndRedux(<App />);

      const inputUsuario = screen.getByLabelText('Usuário:');
      const inputSenha = screen.getByLabelText('Senha:');
      const btnEntrar = screen.getByRole('button', { name: /Entrar/i });

      expect(inputUsuario).toBeInTheDocument();
      expect(inputSenha).toBeInTheDocument();
      expect(btnEntrar).toBeInTheDocument();
      expect(btnEntrar).toBeDisabled();
  });
  test(`Testa se o email tem formato de algumacoisa@dominio.com, e se a senha habilita o button quando atinge o tamanho de 6 dígitos`, () => {
    renderWithRouterAndRedux(<App />);

    const inputUsuario = screen.getByLabelText('Usuário:');
    const inputSenha = screen.getByLabelText('Senha:');
    const btnEntrar = screen.getByRole('button', { name: /Entrar/i });

    userEvent.type(inputUsuario, 'testando@teste.com');
    userEvent.type(inputSenha, '123456');
    expect(inputUsuario).toHaveValue('testando@teste.com');
    expect(inputSenha).toHaveValue('123456');
    expect(btnEntrar).not.toBeDisabled();

    userEvent.type(inputUsuario, 'testando#teste.com');
    userEvent.type(inputSenha, '12345');
    expect(btnEntrar).toBeDisabled();

    userEvent.type(inputUsuario, 'testando@teste,com');
    userEvent.type(inputSenha, '1234567');
    expect(btnEntrar).toBeDisabled();
  });
  test('Testa se ao cliclar no botão Entrar, é direcionado para o componente Carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputUsuario = screen.getByLabelText('Usuário:');
    const inputSenha = screen.getByLabelText('Senha:');
    const btnEntrar = screen.getByRole('button', { name: /Entrar/i });

    userEvent.type(inputUsuario, 'testando@test.com');
    userEvent.type(inputSenha, '123456');
    expect(btnEntrar).not.toBeDisabled();

    userEvent.click(btnEntrar);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
  });
});