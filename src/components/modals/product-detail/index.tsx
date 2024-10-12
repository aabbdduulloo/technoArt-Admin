import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { productdetail } from "@service";
import { useParams } from "react-router-dom";
const MyModal: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleSubmit = async (value: any) => {
    setLoading(true);
    const payload = {
      product_id: Number(id),
      quantity: Number(value.quantity),
      description: value.description,
      discount: Number(value.discount),
      colors: value.colors,
    };
    const response = await productdetail.create_product_detail(payload);
    if (response?.status === 201) {
      setIsModalVisible(false);
      form.resetFields();
      window.location.reload();
    }
    setLoading(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsModalVisible(true)}
        size="large"
        type="primary"
      >
        Add detail
      </Button>
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        title="Add new category"
        footer
        style={{ maxWidth: "450px" }}
      >
        <Form
          form={form}
          name="basic"
          style={{ width: "100%", marginTop: "20px" }}
          onFinish={values => handleSubmit(values)}
          layout="vertical"
        >
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Enter category name" }]}
          >
            <Input type="number" size="large" />
          </Form.Item>
          <Form.Item
            label="Discount"
            name="discount"
            rules={[{ required: true, message: "Enter category name" }]}
          >
            <Input type="number" size="large" />
          </Form.Item>
          <Form.Item
            label="Color"
            name="colors"
            rules={[{ required: true, message: "Enter category name" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Enter category name" }]}
          >
            <TextArea size="large" />
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
