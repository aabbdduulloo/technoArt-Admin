import React, { useState, useEffect } from "react";
import { Form, Input, Modal, notification } from "antd";
import { subcategory } from "@service";

const UpdateCategoryModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  categoryId: any;
  initialName: string;
}> = ({ visible, onClose, onSuccess, categoryId, initialName }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({ name: initialName });
    } else {
      form.resetFields();
    }
  }, [visible, initialName, form]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const response = await subcategory.update_subcategory(categoryId, {
        name: values.name,
      });
      if (response.status === 200) {
        notification.success({
          message: "Category updated successfully!",
        });
        onSuccess();
        onClose();
      }
    } catch (error: any) {
      notification.error({
        message: "Failed to update category",
        description: error?.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Update SubCategory"
      visible={visible}
      onCancel={onClose}
      onOk={() => form.submit()}
      okButtonProps={{ loading }}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="SubCategory Name"
          name="name"
          rules={[{ required: true, message: "Please enter category name!" }]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateCategoryModal;
