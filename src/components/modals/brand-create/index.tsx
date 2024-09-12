import React, { useState } from "react";
import { Button, Form, Input, Modal, notification } from "antd";
import { brand } from "@service";

const AddBrandModal: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
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
      const response = await brand.create({ name: values.name });
      if (response.status === 201) {
        notification.success({
          message: "Brand added successfully!",
        });
        form.resetFields();
        setIsModalVisible(false);
        onSuccess();
      }
    } catch (error: any) {
      notification.error({
        message: "Failed to add brand",
        description: error?.response?.data?.message || "Something went wrong",
      });
    }
    setLoading(false);
  };

  return (
    <>
      <Button
        size="large"
        style={{
          background: "#d55200",
          color: "#fff",
          position: "relative",
          left: "66%",
          bottom: "10px",
        }}
        onClick={showModal}
      >
        Add New Brand
      </Button>
      <Modal
        title="Add New Brand"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
        okButtonProps={{ loading }}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Brand Name"
            name="name"
            rules={[{ required: true, message: "Please enter brand name!" }]}
          >
            <Input placeholder="Enter brand name" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddBrandModal;
