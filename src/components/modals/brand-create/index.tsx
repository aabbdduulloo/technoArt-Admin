import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  notification,
  Upload,
  Image,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { brand, category } from "@service";
import type { UploadFile } from "antd";
import { useParams } from "react-router-dom";
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
  useParams();

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

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const formData = new FormData();

    fileList.forEach(file => {
      if (file.originFileObj) {
        formData.append("file", file.originFileObj);
      }
    });

    formData.append("name", values.name);
    formData.append("category_id", values.category_id);
    formData.append("description", values.description);

    try {
      const response = await brand.create(formData);

      if (response.status === 201) {
        notification.success({
          message: "Brand added successfully!",
        });
        form.resetFields();
        setIsModalVisible(false);
        onSuccess();
        setFileList([]);
      }
    } catch (error: any) {
      notification.error({
        message: "Failed to add brand",
        description: error?.response?.data?.message || "Something went wrong",
      });
    }
    setLoading(false);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <HappyProvider>
        <Button
          onClick={() => setIsModalVisible(true)}
          size="large"
          type="primary"
        >
          Add New Brand
        </Button>
      </HappyProvider>
      <Modal
        open={isModalVisible}
        title="Add New Brand"
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
          <Form.Item
            label="Select Category"
            name="category_id"
            rules={[{ required: true, message: "Please select category!" }]}
          >
            <Select options={categories} size="large" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter brand description!" },
            ]}
          >
            <Input placeholder="Enter brand description" />
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
        </Form>
      </Modal>
    </>
  );
};

export default AddBrandModal;
