import axios from 'axios';
import { GET_AUTH, LOGIN, LOGOUT } from './types';

export const actionGetAuth = () => dispatch => {
  axios.get('/api/users/auth')
    .then(result => dispatch({
      type: GET_AUTH,
      payload: result.data.isAuth
    }));
}

export const actionLogin = formData => dispatch => {
  axios.post('/api/users/auth/login', formData)
    .then(result => dispatch({
      type: LOGIN,
      payload: result.data.isAuth
    }));
}

export const actionLogout = () => dispatch => {
  axios.get('/api/users/auth/logout')
    .then(result => dispatch({
      type: LOGOUT,
      payload: result.data.isAuth
    }));
}