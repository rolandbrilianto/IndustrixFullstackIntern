import { useEffect } from "react";
import { Modal, Form, Input, ColorPicker } from "antd";
import { useTodo } from "../context/TodoContext";
import * as api from "../services/api";

const CategoryForm = ({ open, onClose, editData }) => {
  const [form] = Form.useForm();
  const { fetchCategories } = useTodo();

  useEffect(() => {
    if (editData) {
      form.setFieldsValue(editData);
    } else {
      form.resetFields();
    }
  }, [editData, form]);

  const handleSubmit = async (values) => {
    try {
      // Konversi color dari ColorPicker ke hex string
      const data = {
        ...values,
        color:
          typeof values.color === "string"
            ? values.color
            : values.color.toHexString(),
      };

      if (editData) {
        await api.updateCategory(editData.id, data);
      } else {
        await api.createCategory(data);
      }

      fetchCategories();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      title={editData ? "Edit Category" : "Add Category"}
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText={editData ? "Update" : "Add"}
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Nama kategori */}
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Nama kategori wajib diisi!" }]}
        >
          <Input placeholder="Contoh: Work, Personal, Shopping" />
        </Form.Item>

        {/* Warna kategori */}
        <Form.Item name="color" label="Color" initialValue="#6B7280">
          <ColorPicker format="hex" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryForm;
