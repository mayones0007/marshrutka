import axios from "axios";
import { initInterceptor } from "./interceptor";

export const axiosInstance = axios.create({
  baseURL: `${process.env.VUE_APP_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

initInterceptor(axiosInstance);