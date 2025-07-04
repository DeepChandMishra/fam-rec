// api.ts
import axios, { AxiosInstance } from "axios";
import { API_BASE_URL } from "../constants/api-base-url";

// Create an instance of Axios
const API: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "ngrok-skip-browser-warning": "any",
  },
});

export default API;
