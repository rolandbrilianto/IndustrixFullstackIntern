const categoryService = require("../services/category.service");
const responseMessage = require("../utils/response");

// GET /api/categories
const getAllCategories = async (req, reply) => {
  try {
    const categories = await categoryService.getAllCategories();
    return reply
      .code(200)
      .send(
        responseMessage.successResponse(
          categories,
          "Categories fetched successfully",
        ),
      );
  } catch (err) {
    return reply.code(500).send(responseMessage.errorResponse());
  }
};

// POST /api/categories
const createCategory = async (req, reply) => {
  try {
    const category = await categoryService.createCategory(req.body);
    return reply
      .code(201)
      .send(
        responseMessage.successResponse(
          category,
          "Succesfully created new category",
        ),
      );
  } catch (err) {
    console.log(err);
    return reply.code(500).send(responseMessage.errorResponse());
  }
};

// PUT /api/categories/:id
const updateCategory = async (req, reply) => {
  try {
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body,
    );

    // Kalau null berarti kategori tidak ditemukan
    if (!category) {
      return reply
        .code(404)
        .send(responseMessage.errorResponse("Category not found"));
    }

    return reply
      .code(200)
      .send(responseMessage.successResponse(category, "Category Updated"));
  } catch (err) {
    return reply.code(500).send(responseMessage.errorResponse());
  }
};

// DELETE /api/categories/:id
const deleteCategory = async (req, reply) => {
  try {
    const category = await categoryService.deleteCategory(req.params.id);

    if (!category) {
      return reply
        .code(404)
        .send(responseMessage.errorResponse("Category not found"));
    }

    return reply.code(200).send({ message: "Category deleted successfully" });
  } catch (err) {
    return reply.code(500).send(responseMessage.errorResponse());
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
