import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "services/Api";

import AxiosDefault from "services/AxiosDefault";

const initialState = {
  loading: false,
};

export const addEditSubAdmin = createAsyncThunk(
  "system/addEditSubAdmin",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.ADD_EDIT_SUB_ADMIN,
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

export const deleteSubAdmin = createAsyncThunk(
  "system/deleteSubAdmin",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.DELETE_FAQ,
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

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEditSubAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEditSubAdmin.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addEditSubAdmin.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteSubAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSubAdmin.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteSubAdmin.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default systemSlice.reducer;
