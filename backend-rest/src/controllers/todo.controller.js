const todoService = require("../services/todo.service");
const responseMessage = require("../utils/response");
// GET /api/todos
const getAllTodos = async (req, reply) => {
  try {
    // req.query berisi pagination, search, filter dari URL
    // contoh: /api/todos?page=1&limit=10&search=belajar
    const result = await todoService.getAllTodos(req.query);
    return reply
      .code(200)
      .send(
        responseMessage.successResponse(result, "Todos fetched succesfully"),
      );
  } catch (err) {
    return reply.code(500).send(responseMessage.errorResponse());
  }
};

// GET /api/todos/:id
const getTodoById = async (req, reply) => {
  try {
    const todo = await todoService.getTodoById(req.params.id);

    // Kalau null berarti todo tidak ditemukan
    if (!todo) {
      return reply
        .code(404)
        .send(responseMessage.errorResponse("Todo not found"));
    }

    return reply
      .code(200)
      .send(responseMessage.successResponse(todo, "Todo fetched Successfully"));
  } catch (err) {
    return reply.code(500).send(responseMessage.errorResponse());
  }
};

// POST /api/todos
const createTodo = async (req, reply) => {
  try {
    const todo = await todoService.createTodo(req.body);
    return reply
      .code(201)
      .send(responseMessage.successResponse(todo, "Todo created successfully"));
  } catch (err) {
    return reply.code(500).send(responseMessage.errorResponse());
  }
};

// PUT /api/todos/:id
const updateTodo = async (req, reply) => {
  try {
    const todo = await todoService.updateTodo(req.params.id, req.body);

    if (!todo) {
      return reply
        .code(404)
        .send(responseMessage.errorResponse("Todo not found"));
    }

    return reply
      .code(200)
      .send(responseMessage.successResponse(todo, "todo updated successfully"));
  } catch (err) {
    return reply.code(500).send(responseMessage.errorResponse());
  }
};

// DELETE /api/todos/:id
const deleteTodo = async (req, reply) => {
  try {
    const todo = await todoService.deleteTodo(req.params.id);

    if (!todo) {
      return reply
        .code(404)
        .send(responseMessage.errorResponse("Todo not found"));
    }

    return reply.code(200).send({ message: "Todo deleted successfully" });
  } catch (err) {
    return reply.code(500).send(responseMessage.errorResponse());
  }
};

// PATCH /api/todos/:id/complete
const toggleTodo = async (req, reply) => {
  try {
    const todo = await todoService.toggleTodo(req.params.id);

    if (!todo) {
      return reply.code(404).send(responseMessage.errorResponse("Notfound"));
    }

    return reply
      .code(200)
      .send(responseMessage.successResponse(todo, " toggled success"));
  } catch (err) {
    return reply.code(500).send(responseMessage.errorResponse());
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
};
