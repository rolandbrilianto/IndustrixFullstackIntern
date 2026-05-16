const sequelize = require("../config/database");
const Category = require("./category.model");
const Todo = require("./todo.model");

Category.hasMany(Todo, {
  foreignKey: "category_id",
  onDelete: "SET NULL",
});

Todo.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category", // ← alias, nanti dipakai saat query include category
});

module.exports = { sequelize, Category, Todo };
