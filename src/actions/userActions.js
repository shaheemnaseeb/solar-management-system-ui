import axios from "axios";
import {
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
} from "../types/userActionType";

export const createUser = (user) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_USER });

    try {
      const response = await axios.post(`/api/v1/user`, {
        ...user,
      });

      dispatch({
        type: CREATE_USER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_USER_FAILURE,
        payload: error.response.data.error,
      });
    }
  };
};

export const loginUser = (user) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_USER });

    try {
      const response = await axios.get(`/api/v1/user/login`, {
        ...user,
      });

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_FAILURE,
        payload: error.response.data.error,
      });
    }
  };
};
