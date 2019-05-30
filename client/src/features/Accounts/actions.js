import * as types from './actionTypes';
import axios from 'axios';
import {
  CLEAN_REDUCER
} from '../../constants/actionTypes';

export const GetAccounts = () => (dispatch) => {
  return axios.get(`/accounts`).then((response) => {
    dispatch({ type: CLEAN_REDUCER });
    return dispatch({ type: types.GET_ACCOUNTS, payload: response.data });
  });
};

export const CreateAccount = (data) => (dispatch) => {
  return axios.post(`/accounts`, data).then((response) => {
    return dispatch(GetAccounts());
  });
};

export const EditAccount = (data, oldData) => (dispatch) => {
  return axios.patch(`/accounts/${oldData.id}`, data).then((response) => {
    return dispatch(GetAccounts());
  });
};

export const DeleteAccount = (id) => (dispatch) => {
  return axios.delete(`/accounts/${id}`).then((response) => {
    return dispatch(GetAccounts());
  });
};




