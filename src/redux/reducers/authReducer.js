import { GET_AUTH, LOGIN, LOGOUT } from '../constants';

const initialState = {
  isAuth: 'UNKNOWN'
};

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_AUTH:
      return {
        ...state,
        isAuth: action.payload
      };

    case LOGIN:
      return {
        ...state,
        isAuth: action.payload
      };

    case LOGOUT:
      return {
        ...state,
        isAuth: action.payload
      };

    default:
      return state;
  }
};
