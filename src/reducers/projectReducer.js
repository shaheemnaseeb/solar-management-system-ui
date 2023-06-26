import {
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  CREATE_PROJECT,
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
    case UPDATE_PROJECT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case UPDATE_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_PROJECT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case DELETE_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RESET_PROJECT:
      return {
        ...state,
        projects: [],
        project: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default projectReducer;
