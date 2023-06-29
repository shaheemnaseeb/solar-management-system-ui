import axios from "axios";
import {
  CREATE_PROJECT,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  GET_PROJECT,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_FAILURE,
  UPDATE_PROJECT,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILURE,
  DELETE_PROJECT,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
  RESET_PROJECT,
  RESET_PROJECT_ERROR,
} from "../types/projectActionType";

export const createProject = (project) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_PROJECT });

    try {
      const response = await axios.post(`/api/v1/project`, {
        ...project,
      });

      dispatch({
        type: CREATE_PROJECT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_PROJECT_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const getProjects = (userid) => {
  return async (dispatch) => {
    dispatch({ type: GET_PROJECT });

    try {
      const response = await axios.get(`/api/v1/project/${userid}`);

      dispatch({
        type: GET_PROJECT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_PROJECT_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const updateProject = (projectid, project) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_PROJECT });

    try {
      const response = await axios.put(`/api/v1/project/${projectid}`, {
        ...project,
      });

      dispatch({
        type: UPDATE_PROJECT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PROJECT_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const deleteProject = (projectid) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_PROJECT });

    try {
      const response = await axios.delete(`/api/v1/project/${projectid}`);

      dispatch({
        type: DELETE_PROJECT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_PROJECT_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const resetProjectData = () => {
  return async (dispatch) => {
    dispatch({ type: RESET_PROJECT });
  };
};

export const resetProjectError = () => {
  return async (dispatch) => {
    dispatch({ type: RESET_PROJECT_ERROR });
  };
};
