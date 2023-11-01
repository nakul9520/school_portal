import axios from "axios";
import { isEmpty } from "lodash";

import { clearSession, getSession } from "./utiles";
import { toast } from "react-toastify";
import { REACT_APP_API_END_POINT } from "./constant";

const AxiosDefault = async ({ method, data, url, contentType }) => {
  const APIENDPOINT = REACT_APP_API_END_POINT;

  const AxiosDefault = axios.create({
    baseURL: APIENDPOINT,
    headers: {
      "Content-Type": isEmpty(contentType) ? "application/json" : contentType,
      Accept: "application/json",
    },
  });

  AxiosDefault.interceptors.request.use(
    async function (config) {
      try {
        const { authToken } = getSession();
        config.headers.authorization = `Bearer ${authToken}`;
      } catch (err) {
        console.log("config error ======>", err);
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  AxiosDefault.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      console.log("response error ======>", error);
      if (error.response.status === 401) {
        try {
          clearSession();
          localStorage.clear();
          toast.error("You are unauthorized user");
          window.location.replace("/okouio/admin-portal");
          window.location = "/okouio/admin-portal";
        } catch (e) {
          return e;
        }
      }
      return Promise.reject(error);
    }
  );
  return await AxiosDefault({
    method,
    data,
    url,
    contentType,
  });
};

export default AxiosDefault;
