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
      schema: { tags: ["Todos"], ...getTodosSchema },
    },
    todoController.getAllTodos,
  );

  fastify.get(
    "/:id",
    {
      schema: { tags: ["Todos"] },
    },
    todoController.getTodoById,
  );

  fastify.post(
    "/",
    {
      schema: { tags: ["Todos"], ...createTodoSchema },
    },
    todoController.createTodo,
  );

  fastify.put(
    "/:id",
    {
      schema: { tags: ["Todos"], ...updateTodoSchema },
    },
    todoController.updateTodo,
  );

  fastify.delete(
    "/:id",
    {
      schema: { tags: ["Todos"] },
    },
    todoController.deleteTodo,
  );

  fastify.patch(
    "/:id/complete",
    {
      schema: { tags: ["Todos"] },
    },
    todoController.toggleTodo,
  );
};

module.exports = todoRoutes;
