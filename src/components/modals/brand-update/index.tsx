import React, { useState, useEffect } from "react";
import { Form, Input, Modal, notification, Select } from "antd";
import { brand, category } from "@service";

const UpdateBrandModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  brandId: string;
  initialName: string;
  initialDescription: string;
  initialCategoryId: number;
}> = ({
  visible,
  onClose,
  onSuccess,
  brandId,
  initialName,
  initialDescription,
  initialCategoryId,
}) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      // Set all initial values in a single call
      form.setFieldsValue({
        name: initialName,
        description: initialDescription,
        categoryId: initialCategoryId,
      });
    } else {
      form.resetFields();
    }
  }, [visible, initialName, initialDescription, initialCategoryId, form]);

  const fetchCategories = async () => {
    try {
      const response = await category.get({ limit: 10, page: 1 });
      if (response?.status === 200) {
        setCategories(
          response.data.data.categories.map((item: any) => ({
            label: item.name,
            value: item.id,
          }))
        );
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const response = await brand.update(brandId, {
        name: values.name,
        description: values.description,
        categoryId: values.categoryId,
      });
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
        <Form.Item
          label="Select category"
          name="categoryId"
          rules={[{ required: true, message: "Please select category!" }]}
        >
          <Select size="large" options={categories} />
        </Form.Item>
        <Form.Item
          label="Brand description"
          name="description"
          rules={[
            { required: true, message: "Please enter brand description!" },
          ]}
        >
          <Input placeholder="Enter brand description" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateBrandModal;
