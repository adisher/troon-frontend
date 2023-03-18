import { LOGIN, LOGOUT } from "../actions";

const initialState = { isLoggedIn: false, user: null };

const loginReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: payload,
      };

    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};
export default loginReducer;
