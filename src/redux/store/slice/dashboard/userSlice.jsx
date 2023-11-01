import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "services/Api";

import AxiosDefault from "services/AxiosDefault";

const initialState = {
  schoolListInfo: {},
  schoolDetail: {},
  loading: false,
};

export const addEditSchool = createAsyncThunk(
  "auth/addEditSchool",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.ADD_EDIT_SCHOOL,
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
export const getSchoolList = createAsyncThunk(
  "auth/getSchoolList",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.GET_SCHOOL_LIST,
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
export const getSchoolDetail = createAsyncThunk(
  "auth/getSchoolDetail",
  async (data, id) => {
    try {
      const response = await AxiosDefault({
        method: "GET",
        url: `${Api.GET_SCHOOL_DETAIL}?page=${id}`,
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
export const deleteSchool = createAsyncThunk(
  "auth/deleteSchool",
  async (data, id) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.DELETE_SCHOOL,
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

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEditSchool.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEditSchool.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(addEditSchool.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getSchoolList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSchoolList.fulfilled, (state, { payload }) => {
        state.schoolListInfo = payload ?? {};
        state.loading = false;
      })
      .addCase(getSchoolList.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getSchoolDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSchoolDetail.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(getSchoolDetail.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteSchool.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSchool.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(deleteSchool.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
