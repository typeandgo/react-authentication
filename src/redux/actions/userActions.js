import axios from 'axios';
import { GET_USER } from '../constants';
import config from '../../config';

export const actionGetUser = () => dispatch => {
  axios.get(config.bffUser)
    .then(result => dispatch({
      type: GET_USER,
      payload: result.data
    }));
}