import axios from 'axios';
import { GET_AUTH, LOGIN, LOGOUT } from '../constants';
import config from '../../config';

export const actionGetAuth = () => dispatch => {
  axios.get(config.bffGetToken)
    .then(result => dispatch({
      type: GET_AUTH,
      payload: result.data.isAuth
    }));
}

export const actionLogin = formData => dispatch => {
  axios.post(config.bffLogin, formData)
    .then(result => dispatch({
      type: LOGIN,
      payload: result.data.isAuth
    }));
}

export const actionLogout = () => dispatch => {
  axios.get(config.bffLogout)
    .then(result => dispatch({
      type: LOGOUT,
      payload: result.data.isAuth
    }));
}