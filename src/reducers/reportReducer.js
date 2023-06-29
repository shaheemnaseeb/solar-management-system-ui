import {
  CREATE_REPORT,
  CREATE_REPORT_FAILURE,
  CREATE_REPORT_SUCCESS,
  GET_REPORT,
  GET_REPORT_FAILURE,
  GET_REPORT_SUCCESS,
  RESET_REPORT,
  RESET_REPORT_ERROR,
} from "../types/reportActionType";

const initialState = {
  report: null,
  loading: false,
  error: null,
};

const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REPORT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_REPORT_SUCCESS:
      return {
        ...state,
        report: action.payload,
        loading: false,
        error: null,
      };
    case CREATE_REPORT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_REPORT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_REPORT_SUCCESS:
      return {
        ...state,
        report: action.payload,
        loading: false,
        error: null,
      };
    case GET_REPORT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RESET_REPORT:
      return {
        ...state,
        report: null,
        loading: false,
        error: null,
      };
    case RESET_REPORT_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default reportReducer;
