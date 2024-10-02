import React, { useState } from "react";
import { Button, Form, Input, Modal, notification, Upload, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ads } from "@service";
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

    formData.append("position", values.position);

    try {
      const response = await ads.create_ads(formData);

      if (response.status === 201) {
        notification.success({
          message: "Banner added successfully!",
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
          style={{
            background: "#1677ff",
            color: "#fff",
            position: "relative",
            left: "364px",
            bottom: "10px",
          }}
        >
          Add New Banner
        </Button>
      </HappyProvider>
      <Modal
        open={isModalVisible}
        title="Add New Banner"
        onCancel={handleCancel}
        onOk={() => form.submit()}
        okButtonProps={{ loading }}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Position"
            name="position"
            rules={[
              { required: true, message: "Please enter brand position!" },
            ]}
          >
            <Input placeholder="Enter brand position" />
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
