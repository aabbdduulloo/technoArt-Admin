import { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, theme, Menu, Modal } from "antd";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import routes from "../../router/routes";
import MainLogo from "../../assets/main-logo.svg";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("");

  useEffect(() => {
    // Find the active route and set the selected key based on the current path
    const currentRouteIndex = routes.findIndex(
      route => route.path === location.pathname
    );
    console.log(currentRouteIndex);
    if (currentRouteIndex !== -1) {
      setSelectedKey(currentRouteIndex.toString());
    }
  }, [location.pathname, routes]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    Modal.confirm({
      title: "Do you want to logout?",
      icon: <LogoutOutlined />,
      content: "Your session will be closed.",
      onOk() {
        navigate("/");
      },
    });
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          minHeight: "100vh",
          width: "400px",
          overflow: "auto",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
            padding: collapsed ? "16px 8px" : "16px",
            marginBottom: "16px",
          }}
        >
          <img
            src={MainLogo}
            alt="Main Logo"
            style={{ width: collapsed ? 32 : 48 }}
          />
          {!collapsed && (
            <span style={{ fontSize: "20px", color: "#fff", margin: "9px" }}>
              TechnoArk
            </span>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]} // Dynamically set selected keys
          items={routes.map((item, index) => ({
            key: index.toString(), // Use string keys for consistency
            icon: item.icon,
            label: <NavLink to={item.path}>{item.title}</NavLink>,
          }))}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 63,
              height: 64,
            }}
          />
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{ marginRight: "16px" }}
          >
            Logout
          </Button>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
