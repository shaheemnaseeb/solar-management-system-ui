import axios from "axios";
import {
  CREATE_PROJECT,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  GET_PROJECT,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_FAILURE,
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
        payload: error.response.data.error,
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
        payload: error.response.data.error,
      });
    }
  };
};
