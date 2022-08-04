export const currenciesAPI = async () => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

export const SAVE_EMAIL = 'SAVE_EMAIL';

export const SAVE_WALLET_FORM = 'SAVE_WALLET_FORM';

export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';

export const RECEIVE_CURRENCIES_OK = 'RECEIVE_CURRENCIES_OK';

export const RECEIVE_CURRENCIES_FORM = 'RECEIVE_CURRENCIES_FORM';

export const RECEIVE_CURRENCIES_ERROR = 'RECEIVE_CURRENCIES_ERROR';

export const saveEmail = (payload) => ({
  type: SAVE_EMAIL,
  payload,
});

export const saveWalletForm = (expenses) => ({
  type: SAVE_WALLET_FORM,
  expenses,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const receiveCurrenciesOk = (currencies) => ({
  type: RECEIVE_CURRENCIES_OK,
  currencies: (Object.keys(currencies)).filter((elem) => (elem !== 'USDT')),
});

export const receiveCurrenciesForm = (exchangeRates) => ({
  type: RECEIVE_CURRENCIES_FORM,
  exchangeRates,
});

export const receiveCurrenciesError = (error) => ({
  type: RECEIVE_CURRENCIES_ERROR,
  error,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    dispatch(requestCurrencies());
    try {
      const response = await currenciesAPI();
      dispatch(receiveCurrenciesOk(response));
    } catch (error) {
      dispatch(receiveCurrenciesError(error));
    }
  };
}

export function fetchCurrenciesForm() {
  return async (dispatch) => {
    dispatch(requestCurrencies());
    try {
      const response = await currenciesAPI();
      dispatch(receiveCurrenciesForm(response));
    } catch (error) {
      dispatch(receiveCurrenciesError(error));
    }
  };
}
