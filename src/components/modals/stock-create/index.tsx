import React, { useState, useEffect } from "react";
import { Button, Form, Input, notification, Select, Drawer } from "antd";
import { brand, category, product, stock } from "@service";
import { HappyProvider } from "@ant-design/happy-work-theme";

const AddBrandModal: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brandDisable, setBrandDisable] = useState(true);
  const [productOption, setProductOption] = useState([]);

  const handleSubmit = async (values: any) => {
    setLoading(true);

    const payload = {
      category_id: values.category_id,
      brand_id: values.brand_id,
      product_id: values.product_id,
      quantity: Number(values.quantity),
    };

    try {
      const response = await stock.create_stock(payload);
      if (response.status === 201) {
        notification.success({
          message: "Product added successfully!",
        });
        form.resetFields();
        setIsModalVisible(false);
        onSuccess();
      }
    } catch (error: any) {
      notification.error({
        message: "Failed to add product",
        description: error?.response?.data?.message || "Something went wrong",
      });
    }
    setLoading(false);
  };

  const getSelectBrands = async (id: any) => {
    setLoading(true);
    const response = await brand.get_brands_by_category(id);
    if (response?.status === 200) {
      setBrands(
        response.data.data.brands.map((item: any) => ({
          label: item.name,
          value: item.id,
        }))
      );
    }
    setLoading(false);
    setBrandDisable(false);
  };

  const getProductOptions = async () => {
    const response = await product.get_products({
      limit: 1000,
      page: 1,
      search: "",
    });
    console.log(response);
    if (response?.status === 200) {
      setProductOption(
        response.data.data.products.map((item: any) => ({
          label: item.name,
          value: item.id,
        }))
      );
    }
  };

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

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };
  const clickButton = () => {
    setIsModalVisible(true);
    fetchCategories();
    getProductOptions();
  };

  return (
    <>
      <div onClick={fetchCategories}>
        {" "}
        <Button onClick={clickButton} size="large" type="primary">
          Add New Stock
        </Button>
      </div>

      <Drawer
        width={600}
        onClose={handleCancel}
        open={isModalVisible}
        title="Add New Product"
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <div className="grid grid-cols-2 gap-x-5">
            <Form.Item
              label="Select Category "
              name="category_id"
              rules={[{ required: true, message: "Please select category!" }]}
            >
              <Select
                options={categories}
                size="large"
                onSelect={value => getSelectBrands(value)}
              />
            </Form.Item>
            <Form.Item
              label="Select brand "
              name="brand_id"
              rules={[{ required: true, message: "Select brand" }]}
            >
              <Select
                options={brands}
                disabled={brandDisable}
                size="large"
                onSelect={getProductOptions}
              />
            </Form.Item>
            <Form.Item
              label="Select product"
              name="product_id"
              rules={[{ required: true, message: "Enter category name" }]}
            >
              <Select options={productOption} size="large" />
            </Form.Item>

            <Form.Item
              label=" Quantity"
              name="quantity"
              rules={[{ required: true, message: "Enter product price" }]}
            >
              <Input type="number" size="large" />
            </Form.Item>
          </div>
          <HappyProvider>
            <Button
              size="large"
              style={{ width: "100%" }}
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Add
            </Button>
          </HappyProvider>
        </Form>
      </Drawer>
    </>
  );
};

export default AddBrandModal;
