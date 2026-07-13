import axios from "axios";
import { API_BASE_URL } from "../utils/constants.js";
import { getToken, clearAuthStorage } from "../utils/storage.js";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthStorage();
    }
    return Promise.reject(error);
  },
);

export default api;
