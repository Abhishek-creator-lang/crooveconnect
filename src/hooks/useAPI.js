import { useState } from "react";
import { privateAxiosInstance } from "../api/privateAxiosInstance";
import publicAxiosInstance from "../api/publicAxiosInstance";
import { toast } from 'react-toastify';
import { APIRequestType, successMessage } from "../utils/constant";

const getMethod = (url, axiosInstance, type, config) => {
  let axiosFunction;
  if (type === APIRequestType.post) {
    axiosFunction = axiosInstance.post(url, config);
  } else if (type === APIRequestType.put) {
    axiosFunction = axiosInstance.put(url, config);
  } else if (type === APIRequestType.delete) {
    axiosFunction = axiosInstance.delete(url);
  } else {
    axiosFunction = axiosInstance.get(url);
  }
  return axiosFunction;
};

export const useAPI = ({ type, isPublic, callbackAfterAPIcall, hideSuccess }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callAPI = async (apiUrl, payload) => {
    setLoading(true);
    setError(null); // Reset the error before fetching data
    const axiosInstance = isPublic ? publicAxiosInstance : privateAxiosInstance;
    try {
      const response = await getMethod(apiUrl, axiosInstance, type, payload);
      callbackAfterAPIcall && callbackAfterAPIcall(response, null);
      if(!hideSuccess) toast.success(response?.data?.message || successMessage)
      console.log(response,'response')
      setData(response.data);
    } catch (err) {
      callbackAfterAPIcall && callbackAfterAPIcall(null, err)
      toast.error(err.response?.data?.message)
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, callAPI };
};

