import { createContext, useState, useContext, useCallback } from "react";
import * as api from "../services/api";

// Buat context kosong
const TodoContext = createContext();

// Provider: pembungkus yang menyediakan data ke semua komponen
export const TodoProvider = ({ children }) => {
  // State todos dan pagination
  const [todos, setTodos] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 10,
    total: 0,
    total_pages: 0,
  });

  // State categories
  const [categories, setCategories] = useState([]);

  // State loading & filter
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    completed: undefined,
    priority: undefined,
    category_id: undefined,
  });

  // Ambil semua todos
  const fetchTodos = useCallback(
    async (params = {}) => {
      setLoading(true);
      try {
        const res = await api.getTodos({ ...filters, ...params });
        setTodos(res.data.data.data);
        setPagination(res.data.data.pagination);
      } catch (err) {
        console.error(err);
      } finally {
        // Matikan loading baik sukses maupun error
        setLoading(false);
      }
    },
    [filters],
  );

  // Ambil semua categories
  const fetchCategories = useCallback(async () => {
    try {
      const res = await api.getCategories();
      setCategories(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  // Semua value yang bisa diakses komponen lain
  const value = {
    todos,
    pagination,
    categories,
    loading,
    filters,
    setFilters,
    fetchTodos,
    fetchCategories,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

// Custom hook supaya lebih mudah dipakai di komponen
export const useTodo = () => useContext(TodoContext);
