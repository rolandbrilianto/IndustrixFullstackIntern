const createCategorySchema = {
  body: {
    type: "object",
    // Field yang wajib ada
    required: ["name"],
    properties: {
      name: { type: "string", minLength: 1, maxLength: 100 },
      color: { type: "string", minLength: 7, maxLength: 7 },
    },
  },
};

const updateCategorySchema = {
  body: {
    type: "object",
    properties: {
      name: { type: "string", minLength: 1, maxLength: 100 },
      color: { type: "string", minLength: 7, maxLength: 7 },
    },
  },
};

module.exports = { createCategorySchema, updateCategorySchema };
