import React, { useState } from "react";
import { Button, Form, Input, Modal, notification } from "antd";
import { category } from "@service";

const UpdateCategoryModal: React.FC<{
  onSuccess: () => void;
  categoryId: string;
  initialName: string;
}> = ({ onSuccess, categoryId, initialName }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
    form.setFieldsValue({ name: initialName });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const response = await category.update(categoryId, { name: values.name });
      if (response.status === 200) {
        notification.success({
          message: "Category updated successfully!",
        });
        form.resetFields();
        setIsModalVisible(false);
        onSuccess();
      }
    } catch (error: any) {
      notification.error({
        message: "Failed to update category",
        description: error?.response?.data?.message || "Something went wrong",
      });
    }
    setLoading(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Update Category
      </Button>
      <Modal
        title="Update Category"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
        okButtonProps={{ loading }}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Category Name"
            name="name"
            rules={[{ required: true, message: "Please enter category name!" }]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateCategoryModal;
