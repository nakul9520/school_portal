import { combineReducers } from "@reduxjs/toolkit";
import authReducers from "./slice/auth/authSlice";
import userSliceReducer from "./slice/dashboard/userSlice";

const combinedReducer = combineReducers({
  auth: authReducers,
  users: userSliceReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }
  return combinedReducer(state, action);
};
