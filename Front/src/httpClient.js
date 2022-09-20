import axios from "axios";
import { initInterceptor } from "./interceptor";

export const axiosInstance = axios.create({
  baseURL: "https://134.0.116.25:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

initInterceptor(axiosInstance);