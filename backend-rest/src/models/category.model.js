const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(7),
      allowNull: false,
      defaultValue: "#6B7280",
    },
  },
  {
    tableName: "categories",
    timestamps: true,
    underscored: true,
    updatedAt: false,
  },
);
module.exports = Category;
