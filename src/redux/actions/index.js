const currenciesAPI = async () => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(url);
  const json = await response.json();
  console.log(json);
  return json;
};
// Coloque aqui suas actions
export const SAVE_EMAIL = 'SAVE_EMAIL';

export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';

export const RECEIVE_CURRENCIES_OK = 'RECEIVE_CURRENCIES_OK';

export const RECEIVE_CURRENCIES_ERROR = 'RECEIVE_CURRENCIES_ERROR';

export const saveEmail = (payload) => ({
  type: SAVE_EMAIL,
  payload,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const receiveCurrenciesOk = ({ currencies }) => ({
  type: RECEIVE_CURRENCIES_OK,
  currencies,
});

export const receiveCurrenciesError = (error) => ({
  type: RECEIVE_CURRENCIES_ERROR,
  error,
});

export function fetchCurrencies() {
  return async (dispatch, getState) => {
    console.log('Valor do getState ->', getState);
    dispatch(requestCurrencies());
    try {
      const response = await currenciesAPI();
      console.log(response);
      dispatch(receiveCurrenciesOk(response));
    } catch (error) {
      dispatch(receiveCurrenciesError(error));
    }
  };
}
