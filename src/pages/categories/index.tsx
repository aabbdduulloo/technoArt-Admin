/* eslint-disable react-hooks/exhaustive-deps */
// import { Button, Space, Table } from "antd";
// import type { TableProps } from "antd";
// import {
//   EditOutlined,
//   DeleteOutlined,
//   ArrowsAltOutlined,
// } from "@ant-design/icons";
// import { useEffect, useState } from "react";
// import { Categories } from "@pages";

// interface DataType {
//   key: string;
//   name: string;
// }

// const columns: TableProps<DataType>["columns"] = [
//   {
//     title: "№",
//     key: "index",
//     render: (_, __, index) => index + 1,
//   },
//   {
//     title: "Category Name",
//     dataIndex: "name",
//     key: "name",
//     render: text => <a>{text}</a>,
//   },
//   {
//     title: "Action",
//     key: "action",
// render: () => (
//   <Space size="middle">
//     <Button icon={<EditOutlined />}>Edit</Button>
//     <Button icon={<DeleteOutlined />}>Delete</Button>
//     <Button icon={<ArrowsAltOutlined />}>Move</Button>
//   </Space>
// ),
//   },
// ];

// const Index = () => {
//   const [data, setData] = useState<DataType[]>([]);

//   const getData = async () => {
//     try {
//       const response = await Categories.get();
//       if (response.status === 200 && response?.data?.categories) {
//         setData(
//           response.data.categories.map((item: any) => ({
//             key: item.id,
//             name: item.name,
//           }))
//         );
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return <Table columns={columns} dataSource={data} />;
// };

// export default Index;

import { category } from "@service";

import { useEffect, useState } from "react";
import { Table } from "@components";

const Index = () => {
  const [data, setData] = useState([]);
  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 10,
  });
  const [total, setTotal] = useState(0);

  const getData = async () => {
    try {
      const response = await category.get(params);
      if (response.status === 200) {
        setData(response?.data?.data?.categories);
        setTotal(response?.data?.data?.count); // Assuming the total count is provided by the API
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [params]); // Fetch data whenever params change

  const handleTableChange = (pagination: any) => {
    const { current = 1, pageSize = 10 } = pagination;

    // Update params with the new pagination data
    setParams(prev => ({
      ...prev,
      page: current,
      limit: pageSize,
    }));
  };

  return (
    <div>
      <h1>Categories</h1>
      <Table
        data={data}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: ["2", "5", "7", "10"],
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default Index;
