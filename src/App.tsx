import { ConfigProvider } from "antd";
import { Outlet } from "react-router-dom";
const App = () => {
  return (
    <>
      <ConfigProvider theme={{ token: { colorPrimary: "#d55200" } }}>
        <Outlet />
      </ConfigProvider>
    </>
  );
};

export default App;
