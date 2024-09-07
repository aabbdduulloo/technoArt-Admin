import React, { useState } from "react";
import { Button, Input, Modal, Form, notification } from "antd";
import { category } from "@service";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const res = await category.create(values);

      if (res.status === 200 || res.status === 201) {
        notification.success({
          message: "Category added successfully!",
        });
        setIsModalOpen(false);
        form.resetFields();
        window.location.reload();
      }
    } catch (error: any) {
      notification.error({
        message: "Failed to add category",
        description: error.message || "Something went wrong",
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Button
        onClick={showModal}
        style={{
          backgroundColor: "#d55200",
          color: "white",
        }}
      >
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
