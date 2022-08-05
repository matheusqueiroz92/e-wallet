import {
  REQUEST_CURRENCIES,
  RECEIVE_CURRENCIES_OK,
  RECEIVE_CURRENCIES_FORM,
  RECEIVE_CURRENCIES_ERROR,
  SAVE_WALLET_FORM,
  DELETE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  exchangeRates: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
    };
  case RECEIVE_CURRENCIES_OK:
    return {
      ...state,
      currencies: action.currencies,
    };
  case RECEIVE_CURRENCIES_FORM:
    return {
      ...state,
      exchangeRates: action.exchangeRates,
    };
  case RECEIVE_CURRENCIES_ERROR:
    return {
      ...state,
      error: action.error,
    };
  case SAVE_WALLET_FORM:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.expensesSelected,
    };
  default:
    return state;
  }
};

export default wallet;
