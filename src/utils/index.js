import {
  removeLocalStorageItem,
  getLocalStorageItem,
} from "./localstorageService";
import { ROUTES } from "../routes/routesConstant";

export const getToken = () => getLocalStorageItem("token");

export const logoutUser = () => {
  removeLocalStorageItem("token");
  window.location.href = ROUTES.login;
};
