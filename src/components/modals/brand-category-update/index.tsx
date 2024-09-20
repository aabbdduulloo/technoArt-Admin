import React, { useState, useEffect } from "react";
import { Form, Input, Modal, notification, Select } from "antd";
import { brandcategory, brand } from "@service";

const UpdateBrandModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  brandId: any;
  initialName: string;
  initialCategoryId: number;
}> = ({
  visible,
  onClose,
  onSuccess,
  brandId,
  initialName,
  initialCategoryId,
}) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        name: initialName,
        categoryId: initialCategoryId,
      });
    } else {
      form.resetFields();
    }
  }, [visible, initialName, initialCategoryId, form]);

  const fetchCategories = async () => {
    try {
      const response = await brand.get({ limit: 10, page: 1 });
      if (response?.status === 200) {
        setCategories(
          response.data.data.brands.map((item: any) => ({
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
      const response = await brandcategory.update_brand_category(brandId, {
        name: values.name,
        brand_id: values.brand_id,
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
      title="Update Brand Category"
      visible={visible}
      onCancel={onClose}
      onOk={() => form.submit()}
      okButtonProps={{ loading }}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="Brand Category Name"
          name="name"
          rules={[{ required: true, message: "Please enter brand name!" }]}
        >
          <Input placeholder="Enter brand name" />
        </Form.Item>
        <Form.Item
          label="Select brand"
          name="categoryId"
          rules={[{ required: true, message: "Please select category!" }]}
        >
          <Select size="large" options={categories} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateBrandModal;
