import axios from "axios";
import { VITE_API_URL } from "../configs/dotenv-config";

export const $api = axios.create({
  withCredentials: true,
  baseURL: VITE_API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

// $api.interceptors.response.use((config) => {
//   return config;
// });
