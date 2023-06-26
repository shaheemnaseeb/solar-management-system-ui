import axios from "axios";
import {
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
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

export const updateUser = (user) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_USER });

    try {
      const response = await axios.put(`/api/v1/user/${user.id}`, {
        ...user,
      });

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAILURE,
        payload: error.response.data.error,
      });
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_USER });

    try {
      await axios.delete(`/api/v1/user/${id}`);

      dispatch({
        type: DELETE_USER_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: DELETE_USER_FAILURE,
        payload: error.response.data.error,
      });
    }
  };
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_USER });
    const user = {
      username,
      password,
    };
    try {
      const response = await axios.post(`/api/v1/user/login`, {
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

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT_USER });
  };
};

export const getUser = (username) => {
  return async (dispatch) => {
    dispatch({ type: GET_USER });

    try {
      const response = await axios.get(`/api/v1/user/${username}`);

      dispatch({
        type: GET_USER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_USER_FAILURE,
        payload: error.response.data.error,
      });
    }
  };
}