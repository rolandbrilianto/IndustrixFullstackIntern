import { useState } from "react";
import {
  Layout,
  Typography,
  Button,
  Input,
  Select,
  Card,
  Row,
  Col,
} from "antd";
import { PlusOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import { useTodo } from "../context/TodoContext";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import CategoryForm from "../components/CategoryForm";
import { useEffect } from "react";

const { Header, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const HomePage = () => {
  const { fetchTodos, fetchCategories, filters, setFilters, categories } =
    useTodo();

  // State untuk buka/tutup modal
  const [todoModalOpen, setTodoModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  // State untuk edit data
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
    fetchCategories();
  }, []);

  // Handle search
  const handleSearch = (value) => {
    const newFilters = { ...filters, search: value, page: 1 };
    setFilters(newFilters);
    fetchTodos(newFilters);
  };

  // Handle filter
  const handleFilter = (key, value) => {
    const newFilters = { ...filters, [key]: value, page: 1 };
    setFilters(newFilters);
    fetchTodos(newFilters);
  };

  // Handle edit todo
  const handleEdit = (todo) => {
    setEditTodo(todo);
    setTodoModalOpen(true);
  };

  // Handle tutup modal todo
  const handleCloseTodoModal = () => {
    setTodoModalOpen(false);
    setEditTodo(null);
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      {/* Header */}
      <Header
        style={{ display: "flex", alignItems: "center", padding: "0 24px" }}
      >
        <Title level={3} style={{ color: "white", margin: 0 }}>
          📝 Todo App
        </Title>
      </Header>

      <Content style={{ padding: 24 }}>
        {/* Card Filter */}
        <Card style={{ marginBottom: 16 }}>
          <Row gutter={[16, 16]}>
            {/* Search */}
            <Col xs={24} sm={24} md={10}>
              <Search
                placeholder="Cari todo..."
                onSearch={handleSearch}
                allowClear
              />
            </Col>

            {/* Filter Priority */}
            <Col xs={24} sm={12} md={5}>
              <Select
                placeholder="Filter Priority"
                style={{ width: "100%" }}
                allowClear
                onChange={(value) => handleFilter("priority", value)}
              >
                <Option value="high">🔴 High</Option>
                <Option value="medium">🟡 Medium</Option>
                <Option value="low">🟢 Low</Option>
              </Select>
            </Col>

            {/* Filter Category */}
            <Col xs={24} sm={12} md={5}>
              <Select
                placeholder="Filter Category"
                style={{ width: "100%" }}
                allowClear
                onChange={(value) => handleFilter("category_id", value)}
              >
                {categories.map((cat) => (
                  <Option key={cat.id} value={cat.id}>
                    {cat.name}
                  </Option>
                ))}
              </Select>
            </Col>

            {/* Filter Status */}
            <Col xs={24} sm={12} md={4}>
              <Select
                placeholder="Filter Status"
                style={{ width: "100%" }}
                allowClear
                onChange={(value) => handleFilter("completed", value)}
              >
                <Option value={true}>✅ Complete</Option>
                <Option value={false}>🔴 Incomplete</Option>
              </Select>
            </Col>
          </Row>
        </Card>

        {/* Tombol Add */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <Button
            icon={<AppstoreAddOutlined />}
            onClick={() => setCategoryModalOpen(true)}
          >
            Add Category
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setTodoModalOpen(true)}
          >
            Add Todo
          </Button>
        </div>

        {/* Todo List */}
        <TodoList onEdit={handleEdit} />
      </Content>

      {/* Modal Todo */}
      <TodoForm
        open={todoModalOpen}
        onClose={handleCloseTodoModal}
        editData={editTodo}
      />

      {/* Modal Category */}
      <CategoryForm
        open={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
      />
    </Layout>
  );
};

export default HomePage;
