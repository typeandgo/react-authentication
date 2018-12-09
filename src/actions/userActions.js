import axios from 'axios';
import { GET_USER } from './types';

export const actionGetUser = () => dispatch => {
  axios.get('/api/users')
    .then(result => dispatch({
      type: GET_USER,
      payload: result.data
    }));
}