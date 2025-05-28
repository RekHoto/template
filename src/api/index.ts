import axios from "axios";
import { useAuthStore } from "@/store/authStore";

export const API_URL = __IS_DEV__ ? "/" : `${__API_URL__}/`;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    if (error.response.status === 401 && error.config) {
      useAuthStore.getState().logout();
    }

    throw error;
  }
);

export default $api;
