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
  LOGOUT_USER,
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  RESET_USER_ERROR,
} from "../types/userActionType";

const initialState = {
  user: null,
  isAuthenticated: null,
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
        user: null,
        isAuthenticated: null,
        loading: false,
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
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        isAuthenticated: null,
        loading: false,
        error: null,
      };
    case GET_USER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RESET_USER_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default userReducer;
