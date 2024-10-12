import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { HappyProvider } from "@ant-design/happy-work-theme";

interface AppProps {
  id: string | number;
  deleteItem: (id: string | number) => void;
}

const App: React.FC<AppProps> = ({ id, deleteItem }) => {
  const handleDelete = () => {
    deleteItem(id);
  };

  return (
    <HappyProvider>
      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        okText="Yes"
        cancelText="No"
        onConfirm={handleDelete}
      >
        <Button icon={<DeleteOutlined />} danger />
      </Popconfirm>
    </HappyProvider>
  );
};

export default App;
