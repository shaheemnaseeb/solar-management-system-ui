import {
    CREATE_PROJECT_SUCCESS,
    CREATE_PROJECT_FAILURE,
    CREATE_PROJECT,
    GET_PROJECT,
    GET_PROJECT_SUCCESS,
    GET_PROJECT_FAILURE,
  } from "../types/projectActionType";
  
  const initialState = {
    projects: [],
    project: null,
    loading: false,
    error: null,
  };
  
  const projectReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_PROJECT:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case CREATE_PROJECT_SUCCESS:
        return {
          ...state,
          project: action.payload,
          loading: false,
          error: null,
        };
      case CREATE_PROJECT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case GET_PROJECT:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case GET_PROJECT_SUCCESS:
        return {
          ...state,
          projects: action.payload,
          loading: false,
          error: null,
        };
      case GET_PROJECT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default projectReducer;
  