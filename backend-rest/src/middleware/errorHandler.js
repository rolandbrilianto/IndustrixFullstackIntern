const errorHandler = (err, req, reply) => {
  console.error(err);

  if (err.name === "SequelizeValidationError") {
    return reply.code(400).send({
      success: false,
      error: err.errors.map((e) => e.message).join(", "),
    });
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    return reply.code(400).send({
      success: false,
      error: "Data already exists",
    });
  }

  // Error umum lainnya
  return reply.code(500).send({
    success: false,
    error: "Internal server error",
  });
};

module.exports = errorHandler;
