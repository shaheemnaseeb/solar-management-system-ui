import { applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import projectReducer from "./reducers/projectReducer";
import productReducer from "./reducers/productReducer";
import reportReducer from "./reducers/reportReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducer = combineReducers({
  user: userReducer,
  project: projectReducer,
  product: productReducer,
  report: reportReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore(
  { reducer: persistedReducer },
  applyMiddleware(thunk)
);

export const persistor = persistStore(store);

export default store;
