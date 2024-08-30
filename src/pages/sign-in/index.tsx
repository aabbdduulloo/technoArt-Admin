import { useState } from "react";
import { Form, Input, Spin } from "antd";
import LeftImg from "../../assets/login-bg-CeJ_7tXc.svg";
import { auth } from "@service";
import { saveToken } from "@token-service";
import { useNavigate } from "react-router-dom";
import Notification from "@notification";
import type { FormProps } from "antd";
import { HappyProvider } from "@ant-design/happy-work-theme";
import { Button, Space } from "antd";

type FieldType = {
  phone_number: string | number;
  password: string;
};

const Index = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async values => {
    setLoading(true);
    try {
      const response: any = await auth.sign_in(values);
      if (response && response.status === 201) {
        Notification("success", "Success", "You have successfully signed in.");
        const data = response.data?.data;
        if (data && data.tokens && data.tokens.access_token) {
          const {
            tokens: { access_token },
          } = data;
          saveToken("access_token", access_token);
          navigate("/main");
        }
      } else {
        console.error(`Kutilmagan javob holati: ${response?.status}`);
      }
    } catch (error) {
      console.error("Kirish jarayonida xato:", error);
      Notification("error", "Error", "There was an error during sign-in.");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = errorInfo => {
    console.log("Muvaffaqiyatsizlik:", errorInfo);
  };

  return (
    <div
      style={{ display: "flex", height: "100vh", backgroundColor: "#F8F9FD" }}
    >
      {/* Chap tomondagi rasm */}
      <div
        style={{
          width: "50%",
          height: "100%",
          backgroundImage: `url(${LeftImg})`,
          backgroundSize: "50%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#E3E7FF",
        }}
      ></div>

      {/* O'ng tomondagi kontent */}
      <div
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "500px",
            backgroundColor: "#fff",
            padding: "40px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1
            className="mb-6 text-2xl font-bold"
            style={{ textAlign: "center", fontSize: "34px" }}
          >
            Login
          </h1>
          <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Phone Number"
              name="phone_number"
              rules={[
                {
                  required: true,
                  message: "Iltimos, telefon raqamingizni kiriting!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Iltimos, parolingizni kiriting!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Space style={{ padding: 24 }} size="large">
                <HappyProvider>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full"
                    style={{
                      position: "relative",
                      left: "27px",
                      backgroundColor: "#FF5722",
                      borderColor: "#FF5722",
                      width: "400px",
                    }}
                    disabled={loading}
                  >
                    {loading ? <Spin /> : "Login"}{" "}
                  </Button>
                </HappyProvider>
              </Space>
            </Form.Item>

            <div style={{ textAlign: "center" }}>
              <span>
                Don’t you have an account? <a href="/register">Registrate</a>
              </span>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Index;
