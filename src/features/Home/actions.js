import * as types from './actionTypes';
import axios from 'axios';

export const getFirstExpenses = () => (dispatch) => {
  return axios.get(`/Categories`).then((response) => {
    console.log("respo: ", response)
    return dispatch({ type: types.GET_FIRST_EXPENSES });

  })
};

export const getCategories = (value) => (dispatch) => {
  console.log("valeu: ", value)
  return dispatch({ type: types.GET_CATEGORIES });
}

export const ClearExpenses = () => (dispatch) => {
  dispatch({ type: CLEAR_EXPENSES });
};