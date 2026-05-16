const todoController = require("../controllers/todo.controller");
const {
  createTodoSchema,
  updateTodoSchema,
  getTodosSchema,
} = require("../schemas/todo.schema");

const todoRoutes = async (fastify) => {
  // GET /api/todos - ambil semua todos dengan pagination & filter
  fastify.get(
    "/",
    {
      schema: getTodosSchema,
    },
    todoController.getAllTodos,
  );

  // GET /api/todos/:id - ambil satu todo
  fastify.get("/:id", todoController.getTodoById);

  // POST /api/todos - buat todo baru
  fastify.post(
    "/",
    {
      schema: createTodoSchema,
    },
    todoController.createTodo,
  );

  // PUT /api/todos/:id - update todo
  fastify.put(
    "/:id",
    {
      schema: updateTodoSchema,
    },
    todoController.updateTodo,
  );

  // DELETE /api/todos/:id - hapus todo
  fastify.delete("/:id", todoController.deleteTodo);

  // PATCH /api/todos/:id/complete - toggle status completed
  fastify.patch("/:id/complete", todoController.toggleTodo);
};

module.exports = todoRoutes;
