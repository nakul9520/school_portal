import { combineReducers } from "@reduxjs/toolkit";
import authReducers from "./slice/auth/authSlice";

const combinedReducer = combineReducers({
  auth: authReducers,
});

export const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }
  return combinedReducer(state, action);
};
