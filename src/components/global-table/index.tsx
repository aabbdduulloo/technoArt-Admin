import React from "react";
import { Table as AntdTable, Button, Space, Tooltip } from "antd";
import type { TableColumnsType, TablePaginationConfig } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ArrowsAltOutlined,
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
    width: 60,
    align: "center",
    render: (_, __, index) => <strong>{index + 1}</strong>,
  },
  {
    title: "Category Name",
    dataIndex: "name",
    key: "name",
    align: "center",
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: text => <span style={{ fontWeight: 500 }}>{text}</span>,
  },
  {
    title: "Actions",
    key: "actions",
    width: "50%",
    align: "center",
    render: (_, record) => (
      <Space size="middle">
        <Tooltip title="Edit">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
        </Tooltip>
        <Tooltip title="Delete">
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
        </Tooltip>
        <Tooltip title="View Details">
          <Button
            type="default"
            icon={<ArrowsAltOutlined />}
            onClick={() => handleViewDetails(record)}
          />
        </Tooltip>
      </Space>
    ),
  },
];

const handleEdit = (record: DataType) => {
  console.log("Edit record", record);
  // Edit funksiyasini shu yerda amalga oshiring
};

const handleDelete = (record: DataType) => {
  console.log("Delete record", record);
  // Delete funksiyasini shu yerda amalga oshiring
};

const handleViewDetails = (record: DataType) => {
  console.log("View details of", record);
  // View details funksiyasini shu yerda amalga oshiring
};

const Table: React.FC<CustomTableProps> = ({ data, pagination, onChange }) => {
  return (
    <AntdTable
      columns={columns}
      dataSource={data}
      pagination={pagination}
      onChange={onChange}
      rowKey="key"
      bordered
      size="middle"
      style={{ backgroundColor: "#fff" }}
      scroll={{ x: 800 }}
    />
  );
};

export default Table;
