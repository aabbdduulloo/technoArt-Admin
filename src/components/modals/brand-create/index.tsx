import React, { useState } from "react";
import { Button, Form, Input, Modal, notification, Upload, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { brand } from "@service";
import type { UploadFile, UploadProps } from "antd";

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

  const showModal = () => {
    setIsModalVisible(true);
  };

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

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // Assuming the API expects formData for uploading files
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      fileList.forEach(file => {
        if (file.originFileObj) {
          formData.append("image", file.originFileObj);
        }
      });

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
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter brand description!" },
            ]}
          >
            <Input placeholder="Enter brand description" />
          </Form.Item>
          <Form.Item label="Upload Image">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={() => false} // Prevent automatic upload
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: visible => setPreviewOpen(visible),
                  afterOpenChange: visible => !visible && setPreviewImage(""),
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
