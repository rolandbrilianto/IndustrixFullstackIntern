const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Todo = sequelize.define(
  "Todo",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    priority: {
      type: DataTypes.ENUM("high", "medium", "low"),
      defaultValue: "medium",
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "todos",
    timestamps: true,
    updatedAt: "updated_at",
    createdAt: "created_at",
  },
);
module.exports = Todo;
