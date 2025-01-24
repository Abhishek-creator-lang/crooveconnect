import axios from "axios";
import { apierrorType } from "../constant/constant";
import { getToken, logoutUser } from "../utils";

const privateAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

privateAxiosInstance.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "application/json";
    config.headers["authorization"] = `Bearer ${getToken()}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

privateAxiosInstance.interceptors.response.use(
  function (config) {
    return config;
  },
  function (error) {
    if (error.status === apierrorType.unauthorized) {
      logoutUser();
    }
    return Promise.reject(error);
  }
);

export { privateAxiosInstance };
