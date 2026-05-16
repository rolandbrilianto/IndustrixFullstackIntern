const { Category } = require("../models/index");

const getAllCategories = async () => {
  return await Category.findAll({
    order: [["created_at", "DESC"]],
  });
};

const createCategory = async (data) => {
  return await Category.create(data);
};

const updateCategory = async (id, data) => {
  const category = await Category.findByPk(id);

  if (!category) return null;

  return await category.update(data);
};

const deleteCategory = async (id) => {
  const category = await Category.findByPk(id);

  if (!category) return null;

  await category.destroy();
  return category;
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
