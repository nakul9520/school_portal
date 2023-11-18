import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "services/Api";

import AxiosDefault from "services/AxiosDefault";

const initialState = {
  assignAssignmentListInfo: {},
  listLoading: false,
};

export const getAssignmentListForAssign = createAsyncThunk(
  "assignment/getAssignmentListForAssign",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: `${Api.GET_ASSIGNMENT_LIST_FOR_ASSIGN}?page=${data.page}`,
        data: data.payload,
      });
      return response.data;
    } catch (err) {
      return {
        status: err.response.data.status,
        message: err.response.data.message,
      };
    }
  }
);

export const postAssignAssignment = createAsyncThunk(
  "assignment/postAssignAssignment",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.ASSIGNED_ASSIGNMENT_FOR_CLASS,
        data: data,
      });
      return response.data;
    } catch (err) {
      return {
        status: err.response.data.status,
        message: err.response.data.message,
      };
    }
  }
);

const assignmentSlice = createSlice({
  name: "assignment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAssignmentListForAssign.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(getAssignmentListForAssign.fulfilled, (state, { payload }) => {
        state.assignAssignmentListInfo = payload ?? {};
        state.listLoading = false;
      })
      .addCase(getAssignmentListForAssign.rejected, (state) => {
        state.listLoading = false;
      })
      .addCase(postAssignAssignment.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(postAssignAssignment.fulfilled, (state) => {
        state.listLoading = false;
      })
      .addCase(postAssignAssignment.rejected, (state) => {
        state.listLoading = false;
      });
  },
});

export default assignmentSlice.reducer;
