const todoRoutes = require("./todo.route");
const categoryRoutes = require("./category.route");

const registerRoutes = async (fastify) => {
  fastify.register(categoryRoutes, { prefix: "/api/categories" });

  fastify.register(todoRoutes, { prefix: "/api/todos" });
};

module.exports = registerRoutes;
