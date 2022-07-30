// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REQUEST_CURRENCIES,
  RECEIVE_CURRENCIES_OK,
  RECEIVE_CURRENCIES_ERROR,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
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
  case RECEIVE_CURRENCIES_ERROR:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
};

export default wallet;
