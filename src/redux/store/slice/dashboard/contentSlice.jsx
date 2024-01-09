import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "services/Api";

import AxiosDefault from "services/AxiosDefault";

const initialState = {
  bookListInfo: {},
  bookDetail: {},
  filterList: {},

  voiceTaskInfo: {},
  MCQTaskInfo: {},
  dragDropTaskInfo: {},
  matchingTaskInfo: {},

  contentListInfo: {},
  guideLinesData: {},
  supportTicketListInfo: [],
  supportTicketMessage: [],
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

export const addEditVoiceTask = createAsyncThunk(
  "content/addEditVoiceTask",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.ADD_VOICE_TASK,
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

export const getVoiceTaskList = createAsyncThunk(
  "content/getVoiceTaskList",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: `${Api.VOICE_TASK_DETAIL}/${data.book_id}/?page=${data.page}`,
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

export const deleteVoiceTask = createAsyncThunk(
  "content/deleteVoiceTask",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.DELETE_VOICE_TASK,
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

export const addEditMCQTask = createAsyncThunk(
  "content/addEditMCQTask",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.ADD_MCQ_TASK,
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

export const getMCQTaskList = createAsyncThunk(
  "content/getMCQTaskList",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: `${Api.MCQ_TASK_DETAIL}/${data.book_id}/?page=${data.page}`,
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

export const deleteMCQTask = createAsyncThunk(
  "content/deleteMCQTask",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.DELETE_MCQ_TASK,
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

export const addEditDragDropTask = createAsyncThunk(
  "content/addEditDragDropTask",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.ADD_DRAG_DROP_TASK,
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

export const getDragDropTaskList = createAsyncThunk(
  "content/getDragDropTaskList",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: `${Api.DRAG_DROP_TASK_DETAIL}/${data.book_id}/?page=${data.page}`,
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

export const deleteDragDropTask = createAsyncThunk(
  "content/deleteDragDropTask",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.DELETE_DRAG_DROP_TASK,
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

export const addEditMatchingTask = createAsyncThunk(
  "content/addEditMatchingTask",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.ADD_MATCHING_TASK,
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

export const getMatchingTaskList = createAsyncThunk(
  "content/getMatchingTaskList",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: `${Api.MATCHING_TASK_DETAIL}/${data.book_id}/?page=${data.page}`,
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

export const deleteMatchingTask = createAsyncThunk(
  "content/deleteMatchingTask",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.DELETE_MATCHING_TASK,
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

export const addEditContentFile = createAsyncThunk(
  "content/addEditContentFile",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.ADD_EDIT_CONTENT_FILE,
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

export const deleteContentFile = createAsyncThunk(
  "content/deleteContentFile",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.DELETE_CONTENT_FILE,
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

export const getAllContentList = createAsyncThunk(
  "content/getAllContentList",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: `${Api.ADD_ALL_CONTENT_LIST}?page=${data.page}`,
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

export const addEditGuideLine = createAsyncThunk(
  "content/addEditGuideLine",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.ADD_EDIT_GUIDE_LINES,
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

export const getGuideLineList = createAsyncThunk(
  "content/getGuideLineList",
  async (id) => {
    try {
      const response = await AxiosDefault({
        method: "GET",
        url: `${Api.GET_GUIDE_LINES}/${id}`,
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

export const deleteFAQ = createAsyncThunk("content/deleteFAQ", async (data) => {
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
});

// support

export const getSupportTicketList = createAsyncThunk(
  "content/getSupportTicketList",
  async (pageNumber) => {
    try {
      const response = await AxiosDefault({
        method: "GET",
        url: `${Api.GET_SUPPORT_TICKET_LIST}/?page=${pageNumber}`,
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

export const getSupportTicketChat = createAsyncThunk(
  "content/getSupportTicketChat",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.GET_SUPPORT_MESSAGE_LIST,
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

// filter

export const getFilterList = createAsyncThunk(
  "content/getFilterList",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.GET_FILTER_LIST,
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

export const filterAddEdit = createAsyncThunk(
  "content/filterAddEdit",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.ADD_EDIT_FILTER,
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

export const deleteFilter = createAsyncThunk(
  "content/deleteFilter",
  async (id) => {
    try {
      const response = await AxiosDefault({
        method: "GET",
        url: `${Api.DELETE_FILTER}/${id}`,
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

export const postAddChatForAdmin = createAsyncThunk(
  "content/postAddChatForAdmin",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.POST_ADD_CHAT_MESSAGE,
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

export const postUpdateSupportStatus = createAsyncThunk(
  "content/postUpdateSupportStatus",
  async (data) => {
    try {
      const response = await AxiosDefault({
        method: "POST",
        url: Api.POST_UPDATE_STATUS,
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
      .addCase(filterAddEdit.pending, (state) => {
        state.loading = true;
      })
      .addCase(filterAddEdit.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(filterAddEdit.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteFilter.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFilter.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteFilter.rejected, (state) => {
        state.loading = false;
      })
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
      .addCase(addEditVoiceTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEditVoiceTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addEditVoiceTask.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getVoiceTaskList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVoiceTaskList.fulfilled, (state, { payload }) => {
        state.voiceTaskInfo = payload ?? {};
        state.loading = false;
      })
      .addCase(getVoiceTaskList.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteVoiceTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteVoiceTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteVoiceTask.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addEditMCQTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEditMCQTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addEditMCQTask.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getMCQTaskList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMCQTaskList.fulfilled, (state, { payload }) => {
        state.MCQTaskInfo = payload ?? {};
        state.loading = false;
      })
      .addCase(getMCQTaskList.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteMCQTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMCQTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteMCQTask.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addEditDragDropTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEditDragDropTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addEditDragDropTask.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getDragDropTaskList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDragDropTaskList.fulfilled, (state, { payload }) => {
        state.dragDropTaskInfo = payload ?? {};
        state.loading = false;
      })
      .addCase(getDragDropTaskList.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteDragDropTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDragDropTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteDragDropTask.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addEditMatchingTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEditMatchingTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addEditMatchingTask.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getMatchingTaskList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMatchingTaskList.fulfilled, (state, { payload }) => {
        state.matchingTaskInfo = payload ?? {};
        state.loading = false;
      })
      .addCase(getMatchingTaskList.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteMatchingTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMatchingTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteMatchingTask.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addEditContentFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEditContentFile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addEditContentFile.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteContentFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteContentFile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteContentFile.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllContentList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllContentList.fulfilled, (state, { payload }) => {
        state.contentListInfo = payload ?? {};
        state.loading = false;
      })
      .addCase(getAllContentList.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getGuideLineList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGuideLineList.fulfilled, (state, { payload }) => {
        state.guideLinesData = payload.data ?? {};
        state.loading = false;
      })
      .addCase(getGuideLineList.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteFAQ.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFAQ.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteFAQ.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getSupportTicketList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSupportTicketList.fulfilled, (state, { payload }) => {
        state.supportTicketListInfo = payload ?? {};
        state.loading = false;
      })
      .addCase(getSupportTicketList.rejected, (state) => {
        state.loading = false;
      })
      .addCase(postAddChatForAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(postAddChatForAdmin.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(postAddChatForAdmin.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getSupportTicketChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSupportTicketChat.fulfilled, (state, { payload }) => {
        state.supportTicketMessage = payload.data ?? {};
        state.loading = false;
      })
      .addCase(getSupportTicketChat.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getFilterList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFilterList.fulfilled, (state, { payload }) => {
        state.filterList = payload ?? {};
        state.loading = false;
      })
      .addCase(getFilterList.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default contentSlice.reducer;
