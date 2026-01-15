import axios from "axios";

import {toast} from "sonner";
import { redirectToLogin } from "../utils/AuthRedirect/authRedirect";
import { store } from "../redux/store";
import { deleteUser } from "../redux/actions";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;


axiosInstance.interceptors.response.use(
  (response) => response,

  

  (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }

    const { status } = error.response;

    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      store.dispatch(deleteUser())

      toast.success("User not found.")

      // window.location.href = "/";

      redirectToLogin();
    }

    return Promise.reject(error);
  }
);