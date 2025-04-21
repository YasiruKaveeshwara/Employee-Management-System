import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/api",
  withCredentials: true,
});

// 🔐 Add Bearer token to every request if available
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
