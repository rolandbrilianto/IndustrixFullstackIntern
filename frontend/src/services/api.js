import axios from "axios";

// Base URL backend
const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const getCategories = () => api.get("/categories");

export const createCategory = (data) => api.post("/categories", data);

export const updateCategory = (id, data) => api.put(`/categories/${id}`, data);

export const deleteCategory = (id) => api.delete(`/categories/${id}`);

export const getTodos = (params) => api.get("/todos", { params });

export const getTodoById = (id) => api.get(`/todos/${id}`);

export const createTodo = (data) => api.post("/todos", data);

export const updateTodo = (id, data) => api.put(`/todos/${id}`, data);

export const deleteTodo = (id) => api.delete(`/todos/${id}`);

export const toggleTodo = (id) => api.patch(`/todos/${id}/complete`);
