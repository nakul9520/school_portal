import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "services/Api";

import AxiosDefault from "services/AxiosDefault";

const initialState = {
  bookListInfo: {},
  bookDetail: {},
  loading: false,
};

// School
export const addBookTitle = createAsyncThunk(
  "content/addBookTitle",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.ADD_BOOK_TITLE,
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

export const addBookFiles = createAsyncThunk(
  "content/addBookFiles",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.ADD_BOOK_FILE,
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

export const getBookList = createAsyncThunk(
  "content/getBookList",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: `${Api.GET_BOOK_LIST}?page=${data.page}`,
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

export const getBookDetail = createAsyncThunk(
  "content/getBookDetail",
  async (id) => {
    try {
      const response = await AxiosDefault({
        method: "GET",
        url: `${Api.GET_BOOK_DETAIL}/${id}`,
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

export const postAddToLibrary = createAsyncThunk(
  "content/postAddToLibrary",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.BOOK_ADD_TO_LIBRARY,
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
export const deleteToLibrary = createAsyncThunk(
  "content/deleteToLibrary",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.BOOK_DELETE_TO_LIBRARY,
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

export const addVoiceTask = createAsyncThunk(
  "content/addVoiceTask",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.ADD_VOICE_TASK,
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
const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBookTitle.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBookTitle.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addBookTitle.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addBookFiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBookFiles.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addBookFiles.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getBookList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookList.fulfilled, (state, { payload }) => {
        state.bookListInfo = payload ?? {};
        state.loading = false;
      })
      .addCase(getBookList.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getBookDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookDetail.fulfilled, (state, { payload }) => {
        state.bookDetail = payload ?? {};
        state.loading = false;
      })
      .addCase(getBookDetail.rejected, (state) => {
        state.loading = false;
      })
      .addCase(postAddToLibrary.pending, (state) => {
        state.loading = true;
      })
      .addCase(postAddToLibrary.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(postAddToLibrary.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteToLibrary.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteToLibrary.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteToLibrary.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addVoiceTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(addVoiceTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addVoiceTask.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default contentSlice.reducer;
