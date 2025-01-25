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

export const validateSchema = async (schema, formData) => {
  const formError = {};
  let isValid = true;
  try {
    const validationResult = await schema.validate(formData, {
      abortEarly: false,
    });
  } catch (validationErrors) {
    validationErrors.inner.forEach((error) => {
      formError[error.path] = error.message;
    });
    isValid = false;
  }
  return { formError, isValid };
};

export const splitBearerToken = (bearerToken) => {
  return bearerToken.split(" ")[1];
};
