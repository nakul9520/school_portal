export const saveSession = (data) => {
  localStorage.setItem("authToken", data.token);
  localStorage.setItem("id", data.id);
  localStorage.setItem("email", data.email);
  localStorage.setItem("userType", data.user_type);
  localStorage.setItem("code", data.code);
};

export const getSession = () => {
  return {
    authToken: localStorage.getItem("authToken"),
    id: localStorage.getItem("id"),
    email: localStorage.getItem("email"),
    userType: localStorage.getItem("userType"),
    code: localStorage.getItem("code"),
  };
};

export const clearSession = () => {
  localStorage.clear();
};
