import * as types from './actionTypes';
import axios from 'axios';


export const GetAccounts = () => (dispatch) => {
  return axios.get(`/accounts`).then((response) => {
    dispatch({ type: types.CLEAR_ACCOUNTS });
    return dispatch({ type: types.GET_ACCOUNTS, payload: response.data });
  });
};

export const SelectAccount = (id) => (dispatch) => {
  console.log("dispatchin: ", id);
  dispatch({ type: types.SELECT_ACCOUNT, id: id });
};

export const CreateAccount = (data) => (dispatch) => {
  return axios.post(`/accounts`, data).then((response) => {
    return dispatch(GetAccounts());
  });
};

export const EditAccount = (data, oldData) => (dispatch) => {
  console.log("data:", data);
  return axios.patch(`/accounts/${oldData.id}`, data).then((response) => {
    return dispatch(GetAccounts());
  });
};

export const DeleteAccount = (id) => (dispatch) => {
  return axios.delete(`/accounts/${id}`).then((response) => {
    return dispatch(GetAccounts());
  });
};



