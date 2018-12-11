import { GET_USER } from '../constants';

const initialState = {
  userInfo: {}
};

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_USER:
      return {
        ...state,
        userInfo: action.payload
      };

    default:
      return state;
  }
};
