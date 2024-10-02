import { Button, Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, removeToken } from "@token-service";
import { auth } from "@service";
import { HappyProvider } from "@ant-design/happy-work-theme";

const MyModal: React.FC = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const id: any = getToken("admin_id");
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleDelete = async () => {
    const response = await auth.delete_admin(id);
    if (response?.status === 200) {
      removeToken("access_token");
      removeToken("refresh_token");
      removeToken("admin_id");
      navigate("/signup");
      window.location.reload();
    }
  };
  return (
    <>
      <HappyProvider>
        <Button
          size="large"
          onClick={() => setIsModalVisible(true)}
          type="primary"
          style={{ backgroundColor: "red", position: "relative", left: "10px" }}
        >
          Delete account
        </Button>
      </HappyProvider>
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        style={{ maxWidth: "450px" }}
        title="Are you sure you want to delete account?"
        footer={
          <div className="flex items-center gap-3 justify-end mt-10">
            <HappyProvider>
              <Button size="large" type="default" onClick={handleCancel}>
                Cancel
              </Button>
              <Button size="large" type="primary" onClick={handleDelete}>
                Ok
              </Button>
            </HappyProvider>
          </div>
        }
      />
    </>
  );
};
export default MyModal;
