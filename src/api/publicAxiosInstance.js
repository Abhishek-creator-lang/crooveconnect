import axios from "axios";

const publicAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

publicAxiosInstance.interceptors.request.use(function (config) {
    config.headers["Content-Type"] = "application/json";
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

export default publicAxiosInstance