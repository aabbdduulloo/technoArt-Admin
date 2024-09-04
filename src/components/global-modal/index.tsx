import React, { useState } from "react";
import { Button, Input, Modal, Form, notification } from "antd";
import { category } from "@service"; // Import the category service

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields(); // Form validation
      const response = await category.create({ name: values.categoryName });

      if (response.status === 200 || response.status === 201) {
        notification.success({
          message: "Category added successfully!",
        });
        setIsModalOpen(false);
        form.resetFields();
        window.location.reload(); // Refresh the page
      }
    } catch (error) {
      notification.error({
        message: "Failed to add category",
        description: error.message,
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add New Category
      </Button>
      <Modal
        title="Add New Category"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Add"
        cancelButtonProps={{
          style: { display: "none" },
        }}
      >
        <Form
          form={form}
          name="categoryForm"
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            label="Category Name"
            name="categoryName"
            rules={[
              { required: true, message: "Please input the category name!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default App;
