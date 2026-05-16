// schema untuk validation

const createTodoSchema = {
  body: {
    type: "object",
    // Hanya title yang wajib
    required: ["title"],
    properties: {
      title: { type: "string", minLength: 1, maxLength: 255 },
      description: { type: "string" },
      // Hanya boleh 3 nilai ini
      priority: { type: "string", enum: ["high", "medium", "low"] },
      // UUID format
      category_id: { type: "string", format: "uuid" },
      due_date: { type: "string", format: "date-time" },
    },
  },
};

const updateTodoSchema = {
  body: {
    type: "object",
    // Tidak ada required, semua boleh diupdate sebagian
    properties: {
      title: { type: "string", minLength: 1, maxLength: 255 },
      description: { type: "string" },
      completed: { type: "boolean" },
      priority: { type: "string", enum: ["high", "medium", "low"] },
      category_id: { type: "string", format: "uuid" },
      due_date: { type: ["string", "null"], format: "date-time" },
    },
  },
};

const getTodosSchema = {
  querystring: {
    type: "object",
    properties: {
      // Pagination
      page: { type: "integer", minimum: 1, default: 1 },
      limit: { type: "integer", minimum: 1, maximum: 20, default: 10 },
      // Search
      search: { type: "string" },
      // Filter bonus
      completed: { type: "boolean" },
      priority: { type: "string", enum: ["high", "medium", "low"] },
      category_id: { type: "string", format: "uuid" },
    },
  },
};

module.exports = { createTodoSchema, updateTodoSchema, getTodosSchema };
