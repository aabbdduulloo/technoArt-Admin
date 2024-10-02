import { subcategory } from "@service";
import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";

const MyModal: React.FC = ({ data, setData }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleSubmit = async (values: any) => {
    setLoading(true);
    const category = {
      name: values.name,
      parent_category_id: Number(id),
    };
    const response = await subcategory.create_subcategory(category);
    if (response?.status === 201) {
      setIsModalVisible(false);
      form.resetFields();
      data.push(response?.data?.data);
      setData([...data]);
    }
    setLoading(false);
  };
  return (
    <>
      <Button
        onClick={() => setIsModalVisible(true)}
        size="large"
        type="primary"
        style={{
          background: "#1677ff",
          color: "#fff",
          position: "relative",
          left: "786px",
          bottom: "10px",
        }}
      >
        Add New Subategory
      </Button>

      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        title="Add new subcategory"
        footer={null}
        style={{ maxWidth: "450px" }}
      >
        <Form
          form={form}
          name="basic"
          style={{ width: "100%", marginTop: "20px" }}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            label="Category name"
            name="name"
            rules={[{ required: true, message: "Enter category name" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              style={{ width: "100%" }}
              type="primary"
              htmlType="submit"
              loading={loading}
              iconPosition="end"
            >
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MyModal;
