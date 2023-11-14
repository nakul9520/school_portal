const Api = {
  // Auth
  ADMIN_LOGIN: "login",
  ADMIN_LOGOUT: "logout",
  GET_PROFILE: "getprofile",
  UPDATE_PROFILE: "updateProfile",

  // school
  ADD_EDIT_SCHOOL: "addEditSchool",
  GET_SCHOOL_LIST: "schoolList",
  GET_SCHOOL_DETAIL: "getSchool",
  DELETE_SCHOOL: "schoolDelete",
  GET_SCHOOL_CSV_FILE: "schoolCsv",
  IMPORT_SCHOOL_FILE: "schoolImport",

  // class
  ADD_EDIT_CLASS: "addEditClass",
  GET_CLASS_LIST: "classlist",
  GET_CLASS_DETAIL: "getclass",
  DELETE_CLASS: "classDelete",
  GET_CLASS_CSV_FILE: "classCsv",

  //Techers & students
  ADD_EDIT_USERS: "addEditUser",
  GET_USERS_LIST: "userList",
  GET_USERS_DETAIL: "getUser",
  DELETE_USERS: "userDelete",
  GET_CLASS_BY_SCHOOL: "getClassBySchool",
  GET_TEACHER_CSV_FILE: "teacherCsv",
  GET_STUDENT_CSV_FILE: "studentCsv",
  IMPORT_TEACHER_FILE: "teacherImport",

  // Book
  ADD_BOOK_TITLE: "addEditBook",
  ADD_BOOK_FILE: "addBookFile",
  GET_BOOK_LIST: "bookList",
  GET_BOOK_DETAIL: "getBookDetails",
  BOOK_ADD_TO_LIBRARY: "addToLibray",
  BOOK_DELETE_TO_LIBRARY: "deleteToLibray",

  // Content
  // Book
  ADD_VOICE_TASK: "addVoiceTask",
  VOICE_TASK_DETAIL: "getVoiceTaskDetails",
  DELETE_VOICE_TASK: "deleteVoiceTask",

  ADD_MCQ_TASK: "addMcqTask",
  MCQ_TASK_DETAIL: "getMcqTaskDetails",
  DELETE_MCQ_TASK: "deleteMcqTask",
  // filter
  GET_FILTER_LIST: "getfilterlist",
  ADD_EDIT_FILTER: "addEditFilter",

  // PlateForm Content
  ADD_EDIT_CONTENT_FILE: "addEditVideoContent",
  ADD_ALL_CONTENT_LIST: "getAllContentFile",
  DELETE_CONTENT_FILE: "deletevideoContent",
  SEND_SUPPORT_MESSAGE: "addChat",
  GET_SUPPORT_MESSAGE_LIST: "getMsgforadmin",
  POST_ADD_CHAT_MESSAGE: "addChatforadmin",
  GET_SUPPORT_TICKET_LIST: "userTicketlist",
  ADD_EDIT_GUIDE_LINES: "addQuidelines",
  GET_GUIDE_LINES: "guidelines",
  DELETE_FAQ: "faqdelete",

  // system settings
  ADD_EDIT_SUB_ADMIN: "addEditSubAdmin",

  // Badges
  ADD_EDIT_BADGE: "addEditBadge",
  GET_BADGE_LIST: "badgeList",
  DELETE_BADGE: "deleteBadge",
};

export default Api;
