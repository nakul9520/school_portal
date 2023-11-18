import { combineReducers } from "@reduxjs/toolkit";
import authReducers from "./slice/auth/authSlice";
import userSliceReducer from "./slice/dashboard/userSlice";
import contentSliceReducer from "./slice/dashboard/contentSlice";
import systemSliceReducer from "./slice/dashboard/systemSlice";
import badgeSliceReducer from "./slice/dashboard/badgeSlice";
import leavingSliceReducer from "./slice/dashboard/leavingSlice";
import assignmentSliceReducer from "./slice/dashboard/assignmentSlice";

const combinedReducer = combineReducers({
  auth: authReducers,
  users: userSliceReducer,
  content: contentSliceReducer,
  system: systemSliceReducer,
  badge: badgeSliceReducer,
  leaving: leavingSliceReducer,
  assignment: assignmentSliceReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }
  return combinedReducer(state, action);
};
