import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "services/Api";

import AxiosDefault from "services/AxiosDefault";

const initialState = {
  schoolReportInfo: {},
  bookReportInfo: {},
  listLoading: false,
};

export const getBookReport = createAsyncThunk(
  "report/getBookReport",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: `${Api.GET_BOOK_REPORTS}?page=${data.page}`,
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

export const getSchoolReport = createAsyncThunk(
  "report/getSchoolReport",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: `${Api.GET_SCHOOL_REPORTS}?page=${data.page}`,
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

export const getSpecificSchoolReportCSVFile = createAsyncThunk(
  "report/getSpecificSchoolReportCSVFile",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.GET_SPECIFIC_BOOK_REPORT_CSV_FILE,
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

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSchoolReport.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(getSchoolReport.fulfilled, (state, { payload }) => {
        state.schoolReportInfo = payload ?? {};
        state.listLoading = false;
      })
      .addCase(getSchoolReport.rejected, (state) => {
        state.listLoading = false;
      })
      .addCase(getBookReport.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(getBookReport.fulfilled, (state, { payload }) => {
        state.bookReportInfo = payload ?? {};
        state.listLoading = false;
      })
      .addCase(getBookReport.rejected, (state) => {
        state.listLoading = false;
      });
  },
});

export default reportSlice.reducer;
