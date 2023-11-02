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
};

export default Api;
