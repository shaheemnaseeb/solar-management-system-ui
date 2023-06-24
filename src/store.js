import { applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import projectReducer from "./reducers/projectReducer";
import productReducer from "./reducers/productReducer";

const reducer = combineReducers({
  "user":userReducer,
  "project":projectReducer,
  "product":productReducer,
});
const store = configureStore({ reducer }, applyMiddleware(thunk));

export default store;
