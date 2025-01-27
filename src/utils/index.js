import {
  removeLocalStorageItem,
  getLocalStorageItem,
} from "./localstorageService";
import { ROUTES } from "../routes/routesConstant";
import axios from "axios";

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

export const recognizeImage = async (imageUrl) => {
  const options = {
    method: "POST",
    url: "https://ai-1001fx-functions.p.rapidapi.com/ai/pictureobjectrecognition",
    headers: {
      "x-rapidapi-key": "5a7b5afaf7msh737484ab304e3cfp1a5949jsn1c0572874a74",
      "x-rapidapi-host": "ai-1001fx-functions.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      imageUrl,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result); // Resolve with the Base64 string
    };
    reader.onerror = (error) => {
      reject(error); // Reject if there's an error
    };
    reader.readAsDataURL(file); // Read the file as Base64
  });
};
