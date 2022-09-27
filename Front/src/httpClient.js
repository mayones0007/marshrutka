import axios from "axios";
import { initInterceptor } from "./interceptor";

export const axiosInstance = axios.create({
  baseURL: "https://marshrutka.su/api",
  headers: {
    "Content-Type": "application/json",
  },
});

initInterceptor(axiosInstance);