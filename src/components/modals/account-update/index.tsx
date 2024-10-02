import { getToken } from "@token-service";
import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { auth } from "@service";
interface Data {
  data: any;
}
const MyModal: React.FC<Data> = ({ data }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const id = getToken("admin_id");
  const [form] = Form.useForm();
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleSubmit = async (value: any) => {
    setLoading(true);
    const response = await auth.update_admin(id, value);
    if (response?.status === 200) {
      setIsModalVisible(false);
      form.resetFields();
    }
    setLoading(false);
  };
  return (
    <>
      <Button
        size="large"
        onClick={() => setIsModalVisible(true)}
        type="primary"
        style={{ backgroundColor: "#FFBC01" }}
      >
        Update account
      </Button>
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        title="Update Account"
        footer
        style={{ maxWidth: "450px", position: "relative", top: "60px" }}
      >
        <Form
          form={form}
          name="basic"
          style={{ width: "100%" }}
          onFinish={values => handleSubmit(values)}
          layout="vertical"
        >
          <Form.Item
            label="First name"
            name="first_name"
            rules={[{ required: true, message: "Enter first name" }]}
            initialValue={data?.first_name}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Last name"
            name="last_name"
            rules={[{ required: true, message: "Enter last name" }]}
            initialValue={data?.last_name}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Phone number"
            name="phone_number"
            rules={[{ required: true, message: "Enter phone number" }]}
            initialValue={data?.phone_number}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Enter email" }]}
            initialValue={data?.email}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Enter password" }]}
          >
            <Input.Password size="large" />
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
