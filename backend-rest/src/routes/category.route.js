const categoryController = require("../controllers/category.controller");
const {
  createCategorySchema,
  updateCategorySchema,
} = require("../schemas/category.schema");

const categoryRoutes = async (fastify) => {
  // GET /api/categories - ambil semua kategori
  fastify.get(
    "/",
    { schema: { tags: ["Categories"] } },
    categoryController.getAllCategories,
  );

  // POST /api/categories - buat kategori baru
  fastify.post(
    "/",
    {
      schema: { tags: ["Categories"], ...createCategorySchema },
    },
    categoryController.createCategory,
  );

  // PUT /api/categories/:id - update kategori
  fastify.put(
    "/:id",
    {
      schema: { tags: ["Categories"], ...updateCategorySchema },
    },
    categoryController.updateCategory,
  );

  // DELETE /api/categories/:id - hapus kategori
  fastify.delete(
    "/:id",
    { schema: { tags: ["Categories"] } },
    categoryController.deleteCategory,
  );
};

module.exports = categoryRoutes;
