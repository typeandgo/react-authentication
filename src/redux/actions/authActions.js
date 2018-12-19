import axios from 'axios';
import { LOGIN, LOGOUT, GET_USER, TEST } from '../constants';
import config from '../../config';

export const actionLogin = formData => dispatch => {
  axios.post(config.bffLoginUrl, formData)
    .then(result => {

      console.log('result: ', result.data);

      return dispatch({
        type: LOGIN,
        payload: result.data
      })
    });
}

export const actionLogout = formData => dispatch => {
  axios.get(config.bffLogoutUrl)
    .then(result => dispatch({
      type: LOGOUT,
      payload: result.data
    }));
}

export const actionGetUser = formData => dispatch => {
  axios.get(config.bffGetUserUrl)
    .then(result => dispatch({
      type: GET_USER,
      payload: result.data
    }));
}

export const actionTest = formData => dispatch => {
  axios.get('/bff/forbiddenUrl')
    .then(result => dispatch({
      type: TEST,
      payload: result.data
    }));
}