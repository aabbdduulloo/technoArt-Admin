import { Button, Space, Table } from "antd";
import type { TableProps } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ArrowsAltOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Categories } from "@pages";

interface DataType {
  key: string;
  name: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "№",
    key: "index",
    render: (_, __, index) => index + 1,
  },
  {
    title: "Category Name",
    dataIndex: "name",
    key: "name",
    render: text => <a>{text}</a>,
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <Button icon={<EditOutlined />}>Edit</Button>
        <Button icon={<DeleteOutlined />}>Delete</Button>
        <Button icon={<ArrowsAltOutlined />}>Move</Button>
      </Space>
    ),
  },
];

const Index = () => {
  const [data, setData] = useState<DataType[]>([]);

  const getData = async () => {
    try {
      const response = await Categories.get();
      if (response.status === 200 && response?.data?.categories) {
        setData(
          response.data.categories.map((item: any) => ({
            key: item.id,
            name: item.name,
          }))
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return <Table columns={columns} dataSource={data} />;
};

export default Index;
