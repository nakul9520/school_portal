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
  GET_SPECIFIC_SCHOOL_CSV_FILE: "downloadSelectSchoolCsv",
  IMPORT_SCHOOL_FILE: "schoolImport",

  // School Admin
  ADD_EDIT_SCHOOL_ADMIN: "addEditSchoolAdmin",
  GET_SCHOOL_ADMIN_CSV_FILE: "schoolAdminCsv",
  GET_SPECIFIC_SCHOOL_ADMIN_CSV_FILE: "downloadSelectSchoolAdminCsv",
  IMPORT_SCHOOL_ADMIN_FILE: "schoolAdminImport",

  // class
  ADD_EDIT_CLASS: "addEditClass",
  GET_CLASS_LIST: "classlist",
  GET_CLASS_DETAIL: "getclass",
  DELETE_CLASS: "classDelete",
  GET_CLASS_CSV_FILE: "classCsv",
  IMPORT_CLASS_FILE: "classImport",
  GET_SPECIFIC_CLASS_CSV_FILE: "downloadSelectClassCsv",

  //Techers , students & School Admin
  ADD_EDIT_USERS: "addEditUser",
  GET_USERS_LIST: "userList",
  GET_USERS_DETAIL: "getUser",
  DELETE_USERS: "userDelete",
  GET_CLASS_BY_SCHOOL: "getClassBySchool",
  GET_TEACHER_CSV_FILE: "teacherCsv",
  GET_STUDENT_CSV_FILE: "studentCsv",
  IMPORT_TEACHER_FILE: "teacherImport",
  IMPORT_STUDENT_FILE: "studentImport",
  GET_SPECIFIC_TEACHER_CSV_FILE: "downloadSelectTeacherCsv",
  GET_SPECIFIC_STUDENT_CSV_FILE: "downloadSelectStudentCsv",

  // Leaving
  GET_BOOK_LIST_FOR_ASSIGN: "getContentBookList",
  ASSIGNED_BOOK_FOR_CLASS: "assignedBook",

  // Assignment
  GET_ASSIGNMENT_LIST_FOR_ASSIGN: "getBookListCalender",
  ASSIGNED_ASSIGNMENT_FOR_CLASS: "assignedBookForDate",

  // Reports
  GET_BOOK_REPORTS: "GetBookReports",
  GET_SCHOOL_REPORTS: "GetSchoolReports",
  GET_SPECIFIC_SCHOOL_REPORT_CSV_FILE: "getSelectedReportsDownload",
  GET_BOOK_REPORT_CSV_FILE: "GetBookReportscsv",

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
  DELETE_BOOK: "deleteBook",
  VOICE_TASK_DETAIL: "getVoiceTaskDetails",
  DELETE_VOICE_TASK: "deleteVoiceTask",

  ADD_MCQ_TASK: "addMcqTask",
  EDIT_MCQ_TASK: "editMcqTask",
  MCQ_TASK_DETAIL: "getMcqTaskDetails",
  DELETE_MCQ_TASK: "deleteMcqTask",

  ADD_DRAG_DROP_TASK: "addDragDropTask",
  DRAG_DROP_TASK_DETAIL: "getDragDropTaskDetails",
  DELETE_DRAG_DROP_TASK: "deleteDragDropTask",
  EDIT_DRAG_DROP_TASK: "editDragDropTask",

  ADD_MATCHING_TASK: "addMatchingTask",
  EDIT_MATCHING_TASK: "editMatchingTask",
  MATCHING_TASK_DETAIL: "getMatchingTaskDetails",
  DELETE_MATCHING_TASK: "deleteMatchingTask",

  ADD_EDIT_PUZZEL_TASK: "addPuzzleTask",
  GET_PUZZEL_TASK_LIST: "getPuzzleTaskDetails",
  DELETE_PUZZEL_TASK: "deletePuzzleTask",

  // filter
  GET_FILTER_LIST: "getfilterlist",
  ADD_EDIT_FILTER: "addEditFilter",
  DELETE_FILTER: "filterDelete",

  // PlateForm Content
  ADD_EDIT_CONTENT_FILE: "addEditVideoContent",
  ADD_ALL_CONTENT_LIST: "getAllContentFile",
  DELETE_CONTENT_FILE: "deletevideoContent",
  SEND_SUPPORT_MESSAGE: "addChat",
  GET_SUPPORT_MESSAGE_LIST: "getMsgforadmin",
  POST_ADD_CHAT_MESSAGE: "addChatforadmin",
  GET_SUPPORT_TICKET_LIST: "userTicketlist",
  POST_UPDATE_STATUS: "clickAction",
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
