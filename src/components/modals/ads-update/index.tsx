import React, { useState, useEffect } from "react";
import {
  Form,
  Image,
  Input,
  Modal,
  notification,
  Upload,
  UploadFile,
} from "antd";
import { ads } from "@service";
import { PlusOutlined } from "@ant-design/icons";

type FileType = File & { preview?: string };

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

const UpdateCategoryModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  adsId: number;
  initialName: string;
}> = ({ visible, onClose, onSuccess, adsId, initialName }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

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
      const response = await ads.update(adsId, {
        name: values.position,
      });
      if (response.status === 200) {
        notification.success({
          message: "Category updated successfully!",
        });
        onSuccess();
        onClose();
      }
    } catch (error: any) {
      notification.error({
        message: "Failed to update category",
        description: error?.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  return (
    <Modal
      title="Update Banner"
      visible={visible}
      onCancel={onClose}
      onOk={() => form.submit()}
      okButtonProps={{ loading }}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="Position"
          name="position"
          rules={[{ required: true, message: "Please enter category name!" }]}
        >
          <Input placeholder="Enter  banner name" />
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
  );
};

export default UpdateCategoryModal;
