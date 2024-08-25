import React from "react";
import { Form, Input, Button } from "antd";
import LeftImg from "../../assets/login-bg-CeJ_7tXc.svg"; // Rasm manzilingizni to'g'ri ko'rsating

const baseStyle: React.CSSProperties = {
  width: "100%",
  height: 900,
};

const App: React.FC = () => {
  const [value] = React.useState<string>("vertical");

  const onFinish = (values: unknown) => {
    // Kirish muvaffaqiyatli bo'lganda amalga oshiriladigan kod
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: unknown) => {
    // Kirish muvaffaqiyatsiz bo'lganda amalga oshiriladigan kod
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Chap tomondagi rasm */}
      <div
        style={{
          width: "50%",
          height: "100%",
          backgroundImage: `url(${LeftImg})`,
          backgroundSize: "50%", // Rasmni kichraytirish
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat", // Rasmni takrorlamaslik uchun
          backgroundColor: "#1677ff10",
        }}
      ></div>

      {/* O'ng tomondagi kontent */}
      <div style={{ width: "50%", padding: "20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: value === "vertical" ? "column" : "row",
            height: "calc(100% - 40px)", // O'lchamlarni moslashtiring
            overflow: "auto",
          }}
        >
          <div
            style={{
              ...baseStyle,
              backgroundColor: "#fff", // Rangni o'zgartiring
              flex: 1,
            }}
          >
            <h1 className="mb-6 text-2xl font-bold">Login</h1>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 400 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
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
                <Button type="primary" htmlType="submit" className="w-full">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
