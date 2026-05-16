const fastify = require("fastify")({ logger: true });
const { sequelize } = require("./models/index");
const registerRoutes = require("./routes/index");
const errorHandler = require("./middleware/errorHandler");
fastify.register(require("@fastify/cors"), {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
});

fastify.register(require("@fastify/swagger"), {
  openapi: {
    info: {
      title: "Todo App API",
      description: "API documentation for Industrix Todo App",
      version: "1.0.0",
    },
  },
});
// Swagger UI - bisa diakses di browser
fastify.register(require("@fastify/swagger-ui"), {
  routePrefix: "/documentation",
});
fastify.register(registerRoutes);

fastify.setErrorHandler(errorHandler);
fastify.addHook("onReady", async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
});
fastify.get("/health", async () => {
  return { status: "ok" };
});

module.exports = fastify;
