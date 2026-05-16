const categoryController = require("../controllers/category.controller");
const {
  createCategorySchema,
  updateCategorySchema,
} = require("../schemas/category.schema");

const categoryRoutes = async (fastify) => {
  // GET /api/categories - ambil semua kategori
  fastify.get("/", categoryController.getAllCategories);

  // POST /api/categories - buat kategori baru
  fastify.post(
    "/",
    {
      schema: createCategorySchema,
    },
    categoryController.createCategory,
  );

  // PUT /api/categories/:id - update kategori
  fastify.put(
    "/:id",
    {
      schema: updateCategorySchema,
    },
    categoryController.updateCategory,
  );

  // DELETE /api/categories/:id - hapus kategori
  fastify.delete("/:id", categoryController.deleteCategory);
};

module.exports = categoryRoutes;
