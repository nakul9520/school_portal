import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "services/Api";

import AxiosDefault from "services/AxiosDefault";

const initialState = {
  schoolListInfo: {},
  classListInfo: {},
  userListInfo: {},

  schoolDetail: {},
  classDetail: {},
  userDetail: {},

  classBySchoolList: [],
  loading: false,
};

// School
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
        url: `${Api.GET_SCHOOL_LIST}?page=${data.page}`,
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
export const getSchoolDetail = createAsyncThunk(
  "auth/getSchoolDetail",
  async (id) => {
    try {
      const response = await AxiosDefault({
        method: "GET",
        url: `${Api.GET_SCHOOL_DETAIL}/${id}`,
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

// classs
export const addEditClass = createAsyncThunk(
  "auth/addEditClass",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.ADD_EDIT_CLASS,
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
export const getClassList = createAsyncThunk(
  "auth/getClassList",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: `${Api.GET_CLASS_LIST}?page=${data.page}`,
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
export const getClassDetail = createAsyncThunk(
  "auth/getClassDetail",
  async (id) => {
    try {
      const response = await AxiosDefault({
        method: "GET",
        url: `${Api.GET_CLASS_DETAIL}/${id}`,
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
export const deleteClass = createAsyncThunk(
  "auth/deleteClass",
  async (data, id) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.DELETE_CLASS,
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

// Techer & Student
export const addEditUsers = createAsyncThunk(
  "auth/addEditUsers",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.ADD_EDIT_USERS,
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
export const getUsersList = createAsyncThunk(
  "auth/getUsersList",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: `${Api.GET_USERS_LIST}?page=${data.page}`,
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
export const getUsersDetail = createAsyncThunk(
  "auth/getUsersDetail",
  async (data, id) => {
    try {
      const response = await AxiosDefault({
        method: "GET",
        url: `${Api.GET_USERS_DETAIL}?page=${id}`,
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
export const deleteUsers = createAsyncThunk(
  "auth/deleteUsers",
  async (data, id) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.DELETE_USERS,
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
export const getClassesBySchool = createAsyncThunk(
  "auth/getClassesBySchool",
  async (id) => {
    try {
      const response = await AxiosDefault({
        method: "GET",
        url: `${Api.GET_CLASS_BY_SCHOOL}/${id}`,
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
        state.schoolDetail = payload.data ?? {};
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
      })
      .addCase(addEditClass.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEditClass.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(addEditClass.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getClassList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClassList.fulfilled, (state, { payload }) => {
        state.classListInfo = payload ?? {};
        state.loading = false;
      })
      .addCase(getClassList.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getClassDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClassDetail.fulfilled, (state, { payload }) => {
        state.classDetail = payload.data ?? {};
        state.loading = false;
      })
      .addCase(getClassDetail.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteClass.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteClass.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(deleteClass.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addEditUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEditUsers.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addEditUsers.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUsersList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsersList.fulfilled, (state, { payload }) => {
        state.userListInfo = payload ?? {};
        state.loading = false;
      })
      .addCase(getUsersList.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUsersDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsersDetail.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(getUsersDetail.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(deleteUsers.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getClassesBySchool.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClassesBySchool.fulfilled, (state, { payload }) => {
        state.classBySchoolList = payload.data ?? [];
        state.loading = false;
      })
      .addCase(getClassesBySchool.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
