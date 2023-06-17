import {
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  CREATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
} from "../types/userActionType";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case CREATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        error: null,
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGIN_USER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
