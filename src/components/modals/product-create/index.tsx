import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  notification,
  Upload,
  Image,
  Select,
  Drawer,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { brand, category, brandcategory, product } from "@service";
import type { UploadFile } from "antd";
import { HappyProvider } from "@ant-design/happy-work-theme";

type FileType = File & { preview?: string };

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

const AddBrandModal: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brandDisable, setBrandDisable] = useState(true);
  const [brandCategories, setbrandCategories] = useState([]);
  const [brandCategoryLoading, setBrandCategoryLoading] = useState(false);
  const [brandCategoryDisable, setBrandCategoryDisable] = useState(true);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const formData: any = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("category_id", values.category_id);
    formData.append("brand_id", values.brand_id);
    formData.append("brand_category_id", values.brand_category_id);

    fileList.forEach(file => {
      if (file.originFileObj) {
        formData.append("files", file.originFileObj);
      }
    });

    try {
      const response = await product.create_product(formData);

      if (response.status === 201) {
        notification.success({
          message: "Product added successfully!",
        });
        form.resetFields();
        setIsModalVisible(false);
        onSuccess();
        setFileList([]);
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
      setBrandCategoryLoading(false);
      setBrandCategoryDisable(false);
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
    setFileList([]);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <div onClick={fetchCategories}>
        {" "}
        <Button
          onClick={() => setIsModalVisible(true)}
          size="large"
          style={{
            background: "#1677ff",
            color: "#fff",
            position: "relative",
            left: "1240px",
            bottom: "25px",
          }}
        >
          Add New Product
        </Button>
      </div>

      <Drawer
        width={600}
        onClose={handleCancel}
        open={isModalVisible}
        title="Add New Product"
        loading={loading}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <div className="grid grid-cols-2 gap-x-5">
            <Form.Item
              label="Product Name"
              name="name"
              rules={[
                { required: true, message: "Please enter product name!" },
              ]}
            >
              <Input placeholder="Enter product name" />
            </Form.Item>
            <Form.Item
              label="Product price"
              name="price"
              rules={[{ required: true, message: "Enter product price" }]}
            >
              <Input type="number" size="large" />
            </Form.Item>
            <Form.Item
              label="Select Category name"
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
              label="Select brand name"
              name="brand_id"
              rules={[{ required: true, message: "Select brand" }]}
            >
              <Select
                options={brands}
                disabled={brandDisable}
                onSelect={value => getSelectBrandCategory(value)}
                size="large"
              />
            </Form.Item>
            <Form.Item
              label="Select brand category"
              name="brand_category_id"
              rules={[{ required: true, message: "Select brand category" }]}
            >
              <Select
                options={brandCategories}
                disabled={brandCategoryDisable}
                size="large"
                loading={brandCategoryLoading}
              />
            </Form.Item>
            <Form.Item label="Upload Image" name={"file"}>
              <Upload
                name="file"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={({ fileList }) => setFileList(fileList)}
                beforeUpload={() => false}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: visible => setPreviewOpen(visible),
                  }}
                  src={previewImage}
                />
              )}
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
