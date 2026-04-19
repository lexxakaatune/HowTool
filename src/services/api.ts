// src/services/api.ts
import axios from "axios";

const baseURL = import.meta.env.REACT_APP_API_URL || "https://howtool-backend.onrender.com";

export const api = axios.create({
  baseURL,
  headers: { Accept: "application/json" },
});

// Attach JWT from localStorage to protected requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("howtool_admin_token");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Articles
export const fetchArticles = () => api.get("/api/articles");
export const fetchFeaturedArticles = () =>
  api.get("/api/articles", { params: { featured: true } });
export const fetchArticlesByCategory = (categoryId: string) =>
  api.get("/api/articles", { params: { categoryId } });
export const fetchArticleById = (id: string) => api.get(`/api/articles/${id}`);
export const createArticle = (formData: FormData) =>
  api.post("/api/articles", formData, { headers: { "Content-Type": "multipart/form-data" }});
export const updateArticle = (id: string, payload: any) => api.put(`/api/articles/${id}`, payload);
export const deleteArticleById = (id: string) => api.delete(`/api/articles/${id}`);

// Search and feedback
export const searchArticles = (q: string) => api.get("/api/articles", { params: { q }});
export const sendFeedback = (payload: any) => api.post("/api/feedback", payload);
export const fetchFeedbacks = () => api.get("/api/feedback");
export const updateFeedbackStatus = (id: string, status: string) =>
  api.put(`/api/feedback/${id}`, { status });
export const deleteFeedback = (id: string) =>
  api.delete(`/api/feedback/${id}`);

// User register
export const registerUser = async (data: { username: string; email: string; password: string }) => {
  try {
    const res = await api.post("/auth/register", data);
    return res.data.token;
  } catch (err: any) {
    // Capture backend error message if available
    const message = err.response?.data?.message || err.response?.data?.error || "Registration failed";
    throw new Error(message);
  }
};

// User login
export const userLogin = (data: { email: string; password: string }) => api.post("/auth/login", data);

// Admin auth
export const adminLogin = (data: { username: string; password: string }) => api.post("/api/admin/login", data);

export default api;