import { Button, Modal } from "antd";
import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { subcategory } from "@service";
import { notification } from "antd";

interface MyModalProps {
  record: { id: number; name: string };
  onSuccess: () => void;
}

const MyModal: React.FC<MyModalProps> = ({ record, onSuccess }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const deleteData = async (id: number) => {
    setLoading(true);
    try {
      const response = await subcategory.delete_subcategory(id);
      if (response?.status === 200) {
        notification.success({
          message: "Category deleted successfully",
        });
        setIsModalVisible(false);
        onSuccess();
      }
    } catch (error: any) {
      notification.error({
        message: "Failed to delete category",
        description: error?.response?.data?.message || "Something went wrong",
      });
    }
    setLoading(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsModalVisible(true)}
        icon={<DeleteOutlined />}
      />

      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        style={{ maxWidth: "400px" }}
        title="Delete this category?"
        footer={
          <div className="flex items-center gap-3 justify-end mt-10">
            <Button size="large" type="default" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              size="large"
              loading={loading}
              style={{
                background: "#1677ff",
                color: "#fff",
                position: "relative",
                left: "10px",
              }}
              onClick={() => deleteData(record.id)}
            >
              Ok
            </Button>
          </div>
        }
      >
        <p>
          Are you sure you want to delete the subcategory{" "}
          <strong>{record.name}</strong>?
        </p>
      </Modal>
    </>
  );
};

export default MyModal;
