import { combineReducers } from "@reduxjs/toolkit";
import authReducers from "./slice/auth/authSlice";
import userSliceReducer from "./slice/dashboard/userSlice";
import contentSliceReducer from "./slice/dashboard/contentSlice";

const combinedReducer = combineReducers({
  auth: authReducers,
  users: userSliceReducer,
  content: contentSliceReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }
  return combinedReducer(state, action);
};
