const Api = {
  // Auth
  ADMIN_LOGIN: "login",
  ADMIN_LOGOUT: "logout",
  GET_PROFILE: "getprofile",

  // school
  ADD_EDIT_SCHOOL: "addEditSchool",
  GET_SCHOOL_LIST: "schoolList",
  GET_SCHOOL_DETAIL: "getSchool",
  DELETE_SCHOOL: "schoolDelete",

  // class
  ADD_EDIT_CLASS: "addEditClass",
  GET_CLASS_LIST: "classlist",
  GET_CLASS_DETAIL: "getclass",
  DELETE_CLASS: "classDelete",

  //Techers & students
  ADD_EDIT_USERS: "addEditUser",
  GET_USERS_LIST: "userList",
  GET_USERS_DETAIL: "getUser",
  DELETE_USERS: "userDelete",
  GET_CLASS_BY_SCHOOL: "getClassBySchool",

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
  DELETE_TASK_DETAIL: "deleteVoiceTask",
  
  // PlateForm COntent
  ADD_EDIT_CONTENT_FILE: "addEditVideoContent",
  ADD_ALL_CONTENT_LIST: "getAllContentFile",
  DELETE_CONTENT_FILE: "deletevideoContent",


};

export default Api;
