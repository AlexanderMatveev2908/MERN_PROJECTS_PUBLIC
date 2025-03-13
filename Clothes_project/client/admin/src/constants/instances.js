import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACK_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token && !config.headers.Authorization)
      config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (err) => Promise.reject(err)
);
