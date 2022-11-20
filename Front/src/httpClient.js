import axios from "axios";
import { initInterceptor } from "./interceptor";

export const axiosInstance = axios.create({
  //baseURL: "https://marshrutka.su/api",
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

initInterceptor(axiosInstance);