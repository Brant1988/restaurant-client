import { API_URL } from "@/utils/apiUrl";
import axios from "axios";

const apiClient = axios.create({
  baseURL: `${API_URL}api`,
});

const adminClient = axios.create({
  baseURL: `${API_URL}api`,
});

adminClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (!token) return config;
  if (config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});
export { apiClient, adminClient };
