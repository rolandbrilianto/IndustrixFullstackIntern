const { Op } = require("sequelize");
const { Todo, Category } = require("../models/index");

const getAllTodos = async (query) => {
  const {
    page = 1,
    limit = 10,
    search,
    completed,
    priority,
    category_id,
  } = query;

  const offset = (page - 1) * limit;
  const where = {};

  if (search) {
    where.title = { [Op.iLike]: `%${search}%` };
  }

  if (completed !== undefined) {
    where.completed = completed;
  }

  if (priority) {
    where.priority = priority;
  }

  if (category_id) {
    where.category_id = category_id;
  }

  const { count, rows } = await Todo.findAndCountAll({
    where,
    // Sertakan data kategori sekalian
    include: [
      {
        model: Category,
        as: "category",
        required: false,
      },
    ],
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [["created_at", "DESC"]],
  });

  // Format response dengan pagination info
  return {
    data: rows,
    pagination: {
      current_page: parseInt(page),
      per_page: parseInt(limit),
      total: count,
      total_pages: Math.ceil(count / limit),
    },
  };
};

const getTodoById = async (id) => {
  return await Todo.findByPk(id, {
    include: [
      {
        model: Category,
        as: "category",
        required: false,
      },
    ],
  });
};

const createTodo = async (data) => {
  return await Todo.create(data);
};

const updateTodo = async (id, data) => {
  const todo = await Todo.findByPk(id);

  if (!todo) return null;

  return await todo.update(data);
};

const deleteTodo = async (id) => {
  const todo = await Todo.findByPk(id);

  if (!todo) return null;

  await todo.destroy();
  return todo;
};

const toggleTodo = async (id) => {
  const todo = await Todo.findByPk(id);

  if (!todo) return null;

  return await todo.update({ completed: !todo.completed });
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
};
