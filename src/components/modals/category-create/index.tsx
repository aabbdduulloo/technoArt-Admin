import React, { useState } from "react";
import { Button, Form, Input, Modal, notification } from "antd";
import { category } from "@service";

const AddCategoryModal: React.FC<{ onSuccess: () => void }> = ({
  onSuccess,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const response = await category.create({ name: values.name });
      if (response.status === 201) {
        notification.success({
          message: "Category added successfully!",
        });
        form.resetFields();
        setIsModalVisible(false);
        onSuccess();
      }
    } catch (error: any) {
      notification.error({
        message: "Failed to add category",
        description: error?.response?.data?.message || "Something went wrong",
      });
    }
    setLoading(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add New Category
      </Button>
      <Modal
        title="Add New Category"
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

export default AddCategoryModal;
