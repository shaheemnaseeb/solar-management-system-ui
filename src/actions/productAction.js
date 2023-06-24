import axios from "axios";
import {
  GET_PRODUCT,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILURE,
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  GET_PROJECT_PRODUCT,
  GET_PROJECT_PRODUCT_SUCCESS,
  GET_PROJECT_PRODUCT_FAILURE,
  UPDATE_PROJECT_PRODUCT,
  UPDATE_PROJECT_PRODUCT_SUCCESS,
  UPDATE_PROJECT_PRODUCT_FAILURE,
  DELETE_PROJECT_PRODUCT,
  DELETE_PROJECT_PRODUCT_SUCCESS,
  DELETE_PROJECT_PRODUCT_FAILURE,
} from "../types/productActionType";

export const getProducts = () => {
  return async (dispatch) => {
    dispatch({ type: GET_PRODUCT });

    try {
      const response = await axios.get(`/api/v1/product`);

      dispatch({
        type: GET_PRODUCT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_PRODUCT_FAILURE,
        payload: error.response.data.error,
      });
    }
  };
};

export const addProduct = (product) => {
  return async (dispatch) => {
    dispatch({ type: ADD_PRODUCT });
    try {
      const response = await axios.post(`/api/v1/project/product`, {
        ...product,
      });

      dispatch({
        type: ADD_PRODUCT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ADD_PRODUCT_FAILURE,
        payload: error.response.data.error,
      });
    }
  };
};

export const getProductsbyProjectId = (projectid) => {
  return async (dispatch) => {
    dispatch({ type: GET_PROJECT_PRODUCT });

    try {
      const response = await axios.get(`/api/v1/project/${projectid}/product`);

      dispatch({
        type: GET_PROJECT_PRODUCT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_PROJECT_PRODUCT_FAILURE,
        payload: error.response.data.error,
      });
    }
  };
};

export const updateProduct = (product) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_PROJECT_PRODUCT });

    try {
      const response = await axios.put(
        `/api/v1/project/product/${product.id}`,
        {
          ...product,
        }
      );

      dispatch({
        type: UPDATE_PROJECT_PRODUCT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PROJECT_PRODUCT_FAILURE,
        payload: error.response.data.error,
      });
    }
  };
};

export const deleteProduct = (productid) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_PROJECT_PRODUCT });

    try {
      const response = await axios.delete(
        `/api/v1/project/product/${productid}`
      );

      dispatch({
        type: DELETE_PROJECT_PRODUCT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_PROJECT_PRODUCT_FAILURE,
        payload: error.response.data.error,
      });
    }
  };
};
