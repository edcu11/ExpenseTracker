import * as types from './actionTypes';
import axios from 'axios';


let globalCurrentPage = 1;

export const GetExpenses = (id) => (dispatch) => {
  let filter = BuildExpensesFilter(globalCurrentPage);
  filter.where = { "accountId": id };
  return axios.get(`/Expenses?filter=${encodeURIComponent(JSON.stringify(filter))}`).then((response) => {
    return dispatch({ type: types.GET_EXPENSES, payload: response.data });
  })
};

export const getCategories = () => (dispatch) => {
  return dispatch({ type: types.GET_CATEGORIES });
}

export const ClearExpenses = () => (dispatch) => {
  dispatch({ type: types.CLEAR_EXPENSES });
};

export const BeginExpenses = (id) => (dispatch) => {
  globalCurrentPage = 1;
  dispatch(ClearExpenses());
  dispatch(CountExpenses(id));
  return dispatch(GetExpenses(id));
};

export const CountExpenses = (id) => (dispatch) => {
  let filter = (id !== null) ? { "where": { "accountId": id } } : {};
  return axios.get(`/Expenses/count?where=${encodeURIComponent(JSON.stringify(filter.where))}`)
    .then((response) => {
      dispatch({ type: types.GET_EXPENSES_COUNT, count: response.data.count })
    });
};

function BuildExpensesFilter(page = 1, pageSize = 10) {
  let filter = {
    "include": ["category"],
    "order": "date DESC",
    "limit": 10,
    "skip": (page - 1) * pageSize,
  };
  return filter;
}