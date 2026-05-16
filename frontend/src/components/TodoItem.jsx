import { Card, Tag, Button, Space, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import { useTodo } from "../context/TodoContext";
import * as api from "../services/api";

// Warna prioritas
const priorityConfig = {
  high: { color: "red", label: "High" },
  medium: { color: "gold", label: "Medium" },
  low: { color: "green", label: "Low" },
};

const TodoItem = ({ todo, onEdit }) => {
  const { fetchTodos } = useTodo();

  // Handle delete todo
  const handleDelete = async () => {
    try {
      await api.deleteTodo(todo.id);
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  // Handle toggle complete/incomplete
  const handleToggle = async () => {
    try {
      await api.toggleTodo(todo.id);
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const priority = priorityConfig[todo.priority] || priorityConfig.medium;

  return (
    <Card style={{ marginBottom: 16 }} styles={{ body: { padding: 16 } }}>
      {/* Baris atas: title dan status */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 8,
        }}
      >
        <h3
          style={{
            margin: 0,
            // Kalau completed, title dicoret
            textDecoration: todo.completed ? "line-through" : "none",
            color: todo.completed ? "#999" : "inherit",
          }}
        >
          {todo.title}
        </h3>
        {/* Badge status */}
        <Tag color={todo.completed ? "green" : "red"}>
          {todo.completed ? "Complete" : "Incomplete"}
        </Tag>
      </div>

      {/* Deskripsi */}
      {todo.description && (
        <p style={{ color: "#666", marginBottom: 8 }}>{todo.description}</p>
      )}

      {/* Kategori dan prioritas */}
      <Space style={{ marginBottom: 12 }}>
        {todo.category && (
          <Tag color={todo.category.color}>{todo.category.name}</Tag>
        )}
        <Tag color={priority.color}>{priority.label}</Tag>
      </Space>

      {/* Tombol aksi */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Space>
          {/* Tombol Finish/Undo */}
          <Button
            type={todo.completed ? "default" : "primary"}
            icon={<CheckOutlined />}
            onClick={handleToggle}
            size="small"
          >
            {todo.completed ? "Undo" : "Finish"}
          </Button>

          {/* Tombol Edit */}
          <Button
            icon={<EditOutlined />}
            onClick={() => onEdit(todo)}
            size="small"
          >
            Edit
          </Button>

          {/* Tombol Delete dengan konfirmasi */}
          <Popconfirm
            title="Hapus todo ini?"
            onConfirm={handleDelete}
            okText="Ya"
            cancelText="Tidak"
          >
            <Button danger icon={<DeleteOutlined />} size="small">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      </div>
    </Card>
  );
};

export default TodoItem;
