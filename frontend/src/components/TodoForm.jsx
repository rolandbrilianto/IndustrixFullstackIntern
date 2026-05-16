import { useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker } from "antd";
import { useTodo } from "../context/TodoContext";
import * as api from "../services/api";
import dayjs from "dayjs";

const { TextArea } = Input;
const { Option } = Select;

const TodoForm = ({ open, onClose, editData }) => {
  const [form] = Form.useForm();
  const { categories, fetchTodos } = useTodo();

  // Kalau editData ada, isi form dengan data yang mau diedit
  useEffect(() => {
    if (editData) {
      form.setFieldsValue({
        ...editData,
        due_date: editData.due_date ? dayjs(editData.due_date) : null,
      });
    } else {
      form.resetFields();
    }
  }, [editData, form]);

  const handleSubmit = async (values) => {
    try {
      // Format due_date ke ISO string kalau ada
      const data = {
        ...values,
        due_date: values.due_date ? values.due_date.toISOString() : null,
      };

      if (editData) {
        // Update todo
        await api.updateTodo(editData.id, data);
      } else {
        // Buat todo baru
        await api.createTodo(data);
      }

      // Refresh list todos
      fetchTodos();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      title={editData ? "Edit Todo" : "Add Todo"}
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText={editData ? "Update" : "Add"}
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Title */}
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Title wajib diisi!" }]}
        >
          <Input placeholder="Masukkan judul todo" />
        </Form.Item>

        {/* Description */}
        <Form.Item name="description" label="Description">
          <TextArea rows={3} placeholder="Masukkan deskripsi (opsional)" />
        </Form.Item>

        {/* Priority */}
        <Form.Item name="priority" label="Priority" initialValue="medium">
          <Select>
            <Option value="high">🔴 High</Option>
            <Option value="medium">🟡 Medium</Option>
            <Option value="low">🟢 Low</Option>
          </Select>
        </Form.Item>

        {/* Category */}
        <Form.Item name="category_id" label="Category">
          <Select placeholder="Pilih kategori (opsional)" allowClear>
            {categories.map((cat) => (
              <Option key={cat.id} value={cat.id}>
                {cat.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Due Date */}
        <Form.Item name="due_date" label="Due Date">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TodoForm;
