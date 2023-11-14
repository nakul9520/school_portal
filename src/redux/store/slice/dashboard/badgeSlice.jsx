import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "services/Api";

import AxiosDefault from "services/AxiosDefault";

const initialState = {
  badgeListInfo: {},
  loading: false,
};

export const addEditBadge = createAsyncThunk(
  "badge/addEditBadge",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST", 
        url: Api.ADD_EDIT_BADGE,
        data: data,
        contentType: "multipart/form-data"
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
export const getBadgeList = createAsyncThunk(
  "badge/getBadgeList",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: `${Api.GET_BADGE_LIST}?page=${data.page}`,
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

export const deleteBadge = createAsyncThunk(
  "badge/deleteBadge",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.DELETE_BADGE,
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

const badgeSlice = createSlice({
  name: "badge",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEditBadge.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEditBadge.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addEditBadge.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getBadgeList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBadgeList.fulfilled, (state, { payload }) => {
        state.badgeListInfo = payload ?? {};
        state.loading = false;
      })
      .addCase(getBadgeList.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteBadge.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBadge.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteBadge.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default badgeSlice.reducer;
