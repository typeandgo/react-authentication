import { GET_USER, LOGIN, LOGOUT, TEST } from '../constants';
import { UNKNOWN, AUTHENTICATED, UNAUTHENTICATED } from '../actions/types';

const initialState = {
  user: {},
  auth: UNKNOWN,
  customData: {}
};

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_USER:
      return {
        ...state,
        user: action.payload,
        auth: (action.payload.userId) ? AUTHENTICATED : UNAUTHENTICATED
      };

    case LOGIN:
      return {
        ...state,
        user: action.payload,
        auth: (action.payload.userId) ? AUTHENTICATED : UNAUTHENTICATED
      };

    case LOGOUT:
      return {
        ...state,
        user: {},
        auth: UNAUTHENTICATED
      };

    case TEST:
      return {
        ...state,
        customData: action.payload
      };

    default:
      return state;
  }
};
