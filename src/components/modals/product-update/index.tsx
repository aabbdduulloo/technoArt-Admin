import React, { useState, useEffect } from "react";
import { Form, Input, Modal, notification, Select } from "antd";
import { brand, category, brandcategory, product } from "@service";

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
  const [brandCategoryLoading, setBrandCategoryLoading] = useState(false);

  useEffect(() => {
    if (visible) {
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

  const getSelectBrandCategory = async (id: any) => {
    setBrandCategoryLoading(true);
    const response = await brandcategory.get_brand_category_by_brand(id);
    if (response?.status === 200) {
      setbrandCategories(
        response.data.data.brandCategories.map((item: any) => ({
          label: item.name,
          value: item.id,
        }))
      );
      //   setBrandCategoryLoading(false);
      //   setBrandCategoryDisable(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const response = await product.update_product(brandId, {
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
      title="Update Product"
      visible={visible}
      onCancel={onClose}
      onOk={() => form.submit()}
      okButtonProps={{ loading }}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: "Please enter product name!" }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>
        <Form.Item
          label="Product price"
          name="price"
          rules={[{ required: true, message: "Enter product price" }]}
          // initialValue={record?.price}
        >
          <Input type="number" size="large" />
        </Form.Item>

        <Form.Item
          label="Select category"
          name="categoryId"
          rules={[{ required: true, message: "Please select category!" }]}
        >
          <Select size="large" options={categories} />
        </Form.Item>
        <Form.Item
          label="Select brand name"
          name="brand_id"
          rules={[{ required: true, message: "Select brand" }]}
        >
          <Select
            // loading={brandLoading}
            onSelect={value => getSelectBrandCategory(value)}
            // disabled={brandDisable}
            // options={selectBrands}
            size="large"
          />
        </Form.Item>
        <Form.Item
          label="Select brand category"
          name="brand_category_id"
          rules={[{ required: true, message: "Select brand category" }]}
        >
          <Select
            //   loading={brandCategoryLoading}
            //   disabled={brandCategoryDisable}
            //   options={selectBrandCategory}
            size="large"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateBrandModal;
