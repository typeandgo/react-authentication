import axios from 'axios';
import { LOGIN, LOGOUT, GET_USER, TEST } from '../constants';
import config from '../../config';

export const actionLogin = formData => dispatch => {
  axios.post(config.bffLoginUrl, formData)
    .then(result => {
      return dispatch({
        type: LOGIN,
        payload: result.data
      })
    });
}

export const actionLogout = () => dispatch => {
  axios.get(config.bffLogoutUrl)
    .then(result => dispatch({ type: LOGOUT }));
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
    .then(result => {
      return dispatch({
        type: TEST,
        payload: result.data
      })
    })
    .catch(error => {
      if (error.response.status === 403) {
        return dispatch({ type: LOGOUT })
      };

      return dispatch({
        type: TEST,
        payload: error.response.data
      });
    });
}