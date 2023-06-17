import { applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import projectReducer from "./reducers/projectReducer";

const reducer = combineReducers({
  "user":userReducer,
  "project":projectReducer,
});
const store = configureStore({ reducer }, applyMiddleware(thunk));

export default store;
