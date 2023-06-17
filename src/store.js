import { applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";

const reducer = combineReducers({
  userReducer,
});
const store = configureStore({ reducer }, applyMiddleware(thunk));

export default store;
