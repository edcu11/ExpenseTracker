import * as types from './actionTypes';
import axios from 'axios';


// let globalCurrentPage = 1;

export const GetExpenses = () => (dispatch) => {
  // let filter = BuildExpensesFilter(globalCurrentPage);
  return axios.get(`/Expenses`).then((response) => {
    return dispatch({ type: types.GET_EXPENSES, payload: response.data });
  })
};

export const getCategories = () => (dispatch) => {
  return dispatch({ type: types.GET_CATEGORIES });
}



export const ClearExpenses = () => (dispatch) => {
  dispatch({ type: types.CLEAR_EXPENSES });
};

export const BeginExpenses = () => (dispatch) => {
  dispatch(ClearExpenses());
  dispatch(CountExpenses());
  return dispatch(GetExpenses());
};

export const CountExpenses = (id) => (dispatch) => {
  let filter = (id !== null) ? { "where": { "bankId": id } } : {};
  return axios.get(`/Expenses/count?where=${encodeURIComponent(JSON.stringify(filter.where))}`)
    .then((response) => {
      dispatch({ type: types.GET_EXPENSES_COUNT, count: response.data.count })
    });
};

// function BuildExpensesFilter(page = 1, pageSize = 10) {
//   let filter = {
//     "include": ["category"],
//     "order": "date DESC",
//     "limit": 10,
//     "skip": (page - 1) * pageSize,
//   };
//   return filter;
// }