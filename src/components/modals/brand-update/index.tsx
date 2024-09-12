import React, { useState, useEffect } from "react";
import { Form, Input, Modal, notification } from "antd";
import { brand } from "@service";

const UpdateBrandModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  brandId: string;
  initialName: string;
}> = ({ visible, onClose, onSuccess, brandId, initialName }) => {
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
      const response = await brand.update(brandId, { name: values.name });
      if (response.status === 200) {
        notification.success({
          message: "Brand updated successfully!",
        });
        onSuccess();
        onClose();
      }
    } catch (error: any) {
      notification.error({
        message: "Failed to update brand",
        description: error?.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Update Brand"
      visible={visible}
      onCancel={onClose}
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
  );
};

export default UpdateBrandModal;
