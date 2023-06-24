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

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
      };
    case GET_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
        loading: false,
        error: null,
      };
    case ADD_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_PROJECT_PRODUCT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_PROJECT_PRODUCT_SUCCESS:
      return {
        ...state,
        project_products: action.payload,
        loading: false,
        error: null,
      };
    case GET_PROJECT_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_PROJECT_PRODUCT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_PROJECT_PRODUCT_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case UPDATE_PROJECT_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_PROJECT_PRODUCT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_PROJECT_PRODUCT_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case DELETE_PROJECT_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
