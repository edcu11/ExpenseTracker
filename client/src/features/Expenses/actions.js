import * as types from './actionTypes';
import axios from 'axios';


let globalCurrentPage = 1;

export const GetExpenses = (id) => (dispatch) => {
  let filter = BuildExpensesFilter(globalCurrentPage);
  globalCurrentPage++;
  filter.where = { "accountId": id };
  return axios.get(`/Expenses?filter=${encodeURIComponent(JSON.stringify(filter))}`).then((response) => {
    return dispatch({ type: types.GET_EXPENSES, payload: response.data });
  })
};

export const CreateExpense = (expense, descriptions) => (dispatch) => {
  let data = {
      expense: expense,
      descriptions: descriptions
  }
  return axios.post(`/Expenses/createExpense`, data).then(() => {
    dispatch(BeginExpenses(expense.accountId))
  });
};


export const FindCategory = (id) => (dispatch, getState) => {
  let state = getState();
  return state.expenses.categories.find((c) => {
    return c.id === id;
  });
};


export const ClearExpenses = () => (dispatch) => {
  dispatch({ type: types.CLEAR_EXPENSES });
};

export const BeginExpenses = (id) => (dispatch) => {
  globalCurrentPage = 1;
  dispatch(ClearExpenses());
  dispatch(CountExpenses(id));
  dispatch(GetAccount(id));
  dispatch(GetCategories());
  return dispatch(GetExpenses(id));
};

export const GetAccount = (id) => (dispatch) => {
  let filter = (id !== null) ?
    { "where": { "id": id }, "limit": 1 } : {};
  return axios.get(`/accounts?filter=${encodeURIComponent(JSON.stringify(filter))}`)
    .then((response) => {
      dispatch({ type: types.GET_ACCOUNT, payload: response.data[0] })
    });
};

export const CountExpenses = (id) => (dispatch) => {
  let filter = (id !== null) ? { "where": { "accountId": id } } : {};
  return axios.get(`/Expenses/count?where=${encodeURIComponent(JSON.stringify(filter.where))}`)
    .then((response) => {
      dispatch({ type: types.GET_EXPENSES_COUNT, count: response.data.count })
    });
};

export const GetCategories = () => (dispatch) => {
  return axios.get(`/categories`)
    .then((response) => {
      return dispatch({ type: types.GET_CATEGORIES, payload: response.data })
    });
}

export const CreateCategory = (data) => (dispatch) => {
  return axios.post(`/categories`, data).then(() => {
    dispatch(GetCategories());
  });
};

export const DeleteCategory = (id) => (dispatch) => {
  return axios.delete(`/categories/${id}`).then(() => {
    return dispatch(GetCategories());
  });
};




function BuildExpensesFilter(page = 1, pageSize = 10) {
  let filter = {
    "include": ["category", "descriptions"],
    "order": "date DESC",
    "limit": 10,
    "skip": (page - 1) * pageSize,
  };
  return filter;
}