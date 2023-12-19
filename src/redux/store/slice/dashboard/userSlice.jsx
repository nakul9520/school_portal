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
  uploadLoading: false,
};

// School
export const addEditSchool = createAsyncThunk(
  "users/addEditSchool",
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
  "users/getSchoolList",
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
  "users/getSchoolDetail",
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
  "users/deleteSchool",
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
export const getSchoolCSVFile = createAsyncThunk(
  "users/getSchoolCSVFile",
  async () => {
    try {
      const response = await AxiosDefault({
        method: "GET",
        url: Api.GET_SCHOOL_CSV_FILE,
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

export const getSpecificSchoolCSVFile = createAsyncThunk(
  "users/getSpecificSchoolCSVFile",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.GET_SPECIFIC_SCHOOL_CSV_FILE,
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

export const importSchoolFile = createAsyncThunk(
  "users/importSchoolFile",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.IMPORT_SCHOOL_FILE,
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

// school Admin
export const addEditSchoolAdmin = createAsyncThunk(
  "users/addEditSchoolAdmin",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.ADD_EDIT_SCHOOL_ADMIN,
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

export const getSchoolAdminCSVFile = createAsyncThunk(
  "users/getSchoolAdminCSVFile",
  async () => {
    try {
      const response = await AxiosDefault({
        method: "GET",
        url: Api.GET_SCHOOL_ADMIN_CSV_FILE,
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

export const getSpecificSchoolAdminCSVFile = createAsyncThunk(
  "users/getSpecificSchoolAdminCSVFile",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.GET_SPECIFIC_SCHOOL_ADMIN_CSV_FILE,
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

export const importSchoolAdminFile = createAsyncThunk(
  "users/importSchoolAdminFile",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.IMPORT_SCHOOL_ADMIN_FILE,
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

// classs
export const addEditClass = createAsyncThunk(
  "users/addEditClass",
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
  "users/getClassList",
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
  "users/getClassDetail",
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
  "users/deleteClass",
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
export const getClassCSVFile = createAsyncThunk(
  "users/getClassCSVFile",
  async () => {
    try {
      const response = await AxiosDefault({
        method: "GET",
        url: Api.GET_CLASS_CSV_FILE,
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

export const getSpecificClassCSVFile = createAsyncThunk(
  "users/getSpecificClassCSVFile",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.GET_SPECIFIC_CLASS_CSV_FILE,
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

export const importClassFile = createAsyncThunk(
  "users/importClassFile",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.IMPORT_CLASS_FILE,
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

// Techer & Student
export const addEditUsers = createAsyncThunk(
  "users/addEditUsers",
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
  "users/getUsersList",
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
  "users/getUsersDetail",
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
  "users/deleteUsers",
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
  "users/getClassesBySchool",
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
export const getTeacherCSVFile = createAsyncThunk(
  "users/getTeacherCSVFile",
  async () => {
    try {
      const response = await AxiosDefault({
        method: "GET",
        url: Api.GET_TEACHER_CSV_FILE,
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
export const getStudentCSVFile = createAsyncThunk(
  "users/getStudentCSVFile",
  async () => {
    try {
      const response = await AxiosDefault({
        method: "GET",
        url: Api.GET_STUDENT_CSV_FILE,
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

export const getSpecificTeacherCSVFile = createAsyncThunk(
  "users/getSpecificTeacherCSVFile",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.GET_SPECIFIC_TEACHER_CSV_FILE,
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

export const getSpecificStudentCSVFile = createAsyncThunk(
  "users/getSpecificStudentCSVFile",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.GET_SPECIFIC_STUDENT_CSV_FILE,
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

export const importTeacherFile = createAsyncThunk(
  "users/importTeacherFile",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.IMPORT_TEACHER_FILE,
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
export const importStudentFile = createAsyncThunk(
  "users/importStudentFile",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.IMPORT_STUDENT_FILE,
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
      .addCase(deleteSchool.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteSchool.rejected, (state) => {
        state.loading = false;
      })
      .addCase(importSchoolFile.pending, (state) => {
        state.uploadLoading = true;
      })
      .addCase(importSchoolFile.fulfilled, (state) => {
        state.uploadLoading = false;
      })
      .addCase(importSchoolFile.rejected, (state) => {
        state.uploadLoading = false;
      })
      .addCase(getSchoolCSVFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSchoolCSVFile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getSchoolCSVFile.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addEditSchoolAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEditSchoolAdmin.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addEditSchoolAdmin.rejected, (state) => {
        state.loading = false;
      })
      .addCase(importSchoolAdminFile.pending, (state) => {
        state.uploadLoading = true;
      })
      .addCase(importSchoolAdminFile.fulfilled, (state) => {
        state.uploadLoading = false;
      })
      .addCase(importSchoolAdminFile.rejected, (state) => {
        state.uploadLoading = false;
      })
      .addCase(addEditClass.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEditClass.fulfilled, (state) => {
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
      .addCase(importClassFile.pending, (state) => {
        state.uploadLoading = true;
      })
      .addCase(importClassFile.fulfilled, (state) => {
        state.uploadLoading = false;
      })
      .addCase(importClassFile.rejected, (state) => {
        state.uploadLoading = false;
      })
      .addCase(getClassCSVFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClassCSVFile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getClassCSVFile.rejected, (state) => {
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
      })
      .addCase(importStudentFile.pending, (state) => {
        state.uploadLoading = true;
      })
      .addCase(importStudentFile.fulfilled, (state) => {
        state.uploadLoading = false;
      })
      .addCase(importStudentFile.rejected, (state) => {
        state.uploadLoading = false;
      })
      .addCase(importTeacherFile.pending, (state) => {
        state.uploadLoading = true;
      })
      .addCase(importTeacherFile.fulfilled, (state) => {
        state.uploadLoading = false;
      })
      .addCase(importTeacherFile.rejected, (state) => {
        state.uploadLoading = false;
      })
      .addCase(getTeacherCSVFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTeacherCSVFile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getTeacherCSVFile.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getStudentCSVFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentCSVFile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getStudentCSVFile.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
