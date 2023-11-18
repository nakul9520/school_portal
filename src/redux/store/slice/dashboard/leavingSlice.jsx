import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "services/Api";

import AxiosDefault from "services/AxiosDefault";

const initialState = {
  assignBookListInfo: {},
  listLoading: false,
};

export const getBookListForAssign = createAsyncThunk(
  "leaving/getBookListForAssign",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: `${Api.GET_BOOK_LIST_FOR_ASSIGN}?page=${data.page}`,
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

export const postAssignBook = createAsyncThunk(
  "leaving/postAssignBook",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.ASSIGNED_BOOK_FOR_CLASS,
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

const leavingSlice = createSlice({
  name: "leaving",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBookListForAssign.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(getBookListForAssign.fulfilled, (state, { payload }) => {
        state.assignBookListInfo = payload ?? {};
        state.listLoading = false;
      })
      .addCase(getBookListForAssign.rejected, (state) => {
        state.listLoading = false;
      })
      .addCase(postAssignBook.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(postAssignBook.fulfilled, (state) => {
        state.listLoading = false;
      })
      .addCase(postAssignBook.rejected, (state) => {
        state.listLoading = false;
      });
  },
});

export default leavingSlice.reducer;
