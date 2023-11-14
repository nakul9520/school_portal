import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "services/Api";

import AxiosDefault from "services/AxiosDefault";
import { clearSession } from "services/utiles";

const initialState = {
  profileInfo: {},
  loading: false,
};

export const postLogin = createAsyncThunk("auth/postLogin", async (data) => {
  try {
    const response = await AxiosDefault({
      method: "POST",
      url: Api.ADMIN_LOGIN,
      data: data,
    });
    return response.data;
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
    };
  }
});

export const postLogout = createAsyncThunk("auth/postLogout", async () => {
  try {
    const response = await AxiosDefault({
      method: "GET",
      url: Api.ADMIN_LOGOUT,
    });
    return response.data;
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
    };
  }
});
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.UPDATE_PROFILE,
        data: data,
        contentType: "multipart/form-data",
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
export const getProfileInfo = createAsyncThunk(
  "auth/getProfileInfo",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.GET_PROFILE,
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      clearSession();
      state = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(postLogin.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(postLogin.rejected, (state) => {
        state.loading = false;
      })
      .addCase(postLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(postLogout.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(postLogout.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getProfileInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfileInfo.fulfilled, (state, { payload }) => {
        state.profileInfo = payload.data ?? {};
        state.loading = false;
      })
      .addCase(getProfileInfo.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
