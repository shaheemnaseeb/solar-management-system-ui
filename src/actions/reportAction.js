import axios from "axios";
import {
    CREATE_REPORT,
    CREATE_REPORT_FAILURE,
    CREATE_REPORT_SUCCESS,
    GET_REPORT,
    GET_REPORT_FAILURE,
    GET_REPORT_SUCCESS,
} from "../types/reportActionType";

export const createReport = (userid,productid) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_REPORT });

    try {
      const response = await axios.post(`/report/${userid}/create/${productid}`);

      dispatch({
        type: CREATE_REPORT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_REPORT_FAILURE,
        payload: error.response.data.error,
      });
    }
  };
};

export const getReport = (productid) => {
  return async (dispatch) => {
    dispatch({ type: GET_REPORT });

    try {
      const response = await axios.get(`/report/get/${productid}`);

      dispatch({
        type: GET_REPORT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_REPORT_FAILURE,
        payload: error.response.data.error,
      });
    }
  };
};
