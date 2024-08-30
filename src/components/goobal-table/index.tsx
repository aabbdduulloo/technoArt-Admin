import React from "react";
import { Table as AntdTable, Button, Space } from "antd";
import type { TableColumnsType, TablePaginationConfig } from "antd";
import {
  ArrowsAltOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

interface CustomTableProps {
  data: DataType[];
  pagination: TablePaginationConfig;
  onChange: (pagination: TablePaginationConfig) => void;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "№",
    dataIndex: "number",
    key: "index",
    render: (_, __, index) => index + 1,
  },
  { title: "Product Name", dataIndex: "name", key: "name" },
  {
    title: "Action",
    key: "Action",
    render: () => (
      <Space size="middle">
        <Button icon={<EditOutlined />}></Button>
        <Button icon={<DeleteOutlined />}></Button>
        <Button icon={<ArrowsAltOutlined />}></Button>
      </Space>
    ),
  },
];

const Table: React.FC<CustomTableProps> = ({ data, pagination, onChange }) => {
  return (
    <AntdTable
      columns={columns}
      dataSource={data}
      pagination={pagination}
      onChange={pagination => onChange(pagination)}
      rowKey="key"
      bordered
    />
  );
};

export default Table;
