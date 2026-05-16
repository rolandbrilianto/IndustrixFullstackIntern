import { Row, Col, Pagination, Empty, Spin } from "antd";
import { useTodo } from "../context/TodoContext";
import TodoItem from "./TodoItem";

const TodoList = ({ onEdit }) => {
  const { todos, pagination, loading, fetchTodos, filters, setFilters } =
    useTodo();

  // Handle ganti halaman pagination
  const handlePageChange = (page, pageSize) => {
    const newFilters = { ...filters, page, limit: pageSize };
    setFilters(newFilters);
    fetchTodos(newFilters);
  };

  // Loading spinner
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 48 }}>
        <Spin size="large" />
      </div>
    );
  }

  // Kalau tidak ada todo
  if (todos.length === 0) {
    return <Empty description="Belum ada todo" style={{ padding: 48 }} />;
  }

  return (
    <div>
      {/* List todo */}
      <Row gutter={[16, 16]}>
        {todos.map((todo) => (
          // Responsive: 1 kolom di HP, 2 kolom di tablet, 3 kolom di desktop
          <Col xs={24} sm={24} md={12} lg={8} key={todo.id}>
            <TodoItem todo={todo} onEdit={onEdit} />
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <Pagination
          current={pagination.current_page}
          pageSize={pagination.per_page}
          total={pagination.total}
          onChange={handlePageChange}
          showSizeChanger
          pageSizeOptions={["10", "20"]}
        />
      </div>
    </div>
  );
};

export default TodoList;
