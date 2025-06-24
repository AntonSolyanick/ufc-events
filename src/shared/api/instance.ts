import axios from "axios";
import Cookies from "js-cookie";

const urlUFC = process.env.NEXT_PUBLIC_UFC_URL;

export const api = axios.create({
  baseURL: urlUFC,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  paramsSerializer: {
    indexes: null, // Важно для правильной сериализации параметров
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
