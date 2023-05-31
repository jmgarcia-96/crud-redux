import { configureStore, applyMiddleware, compose } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducer from "./reducers";

const store = configureStore(
  { reducer },
  compose(applyMiddleware(thunk)),
  typeof window === "object" &&
    typeof window.hasOwnProperty("__REDUX_DEVTOOLS_EXTENSION__") !== undefined
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f
);

export default store;
