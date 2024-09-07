// // /* eslint-disable react-hooks/exhaustive-deps */

// // import { category } from "@service";

// // import { useEffect, useState } from "react";
// // import { Table } from "@components";
// // import { Modals } from "@components";

// // const Index = () => {
// //   const [data, setData] = useState([]);
// //   const [params, setParams] = useState({
// //     search: "",
// //     page: 1,
// //     limit: 10,
// //   });
// //   const [total, setTotal] = useState(0);

// //   const getData = async () => {
// //     try {
// //       const response = await category.get(params);
// //       if (response.status === 200) {
// //         setData(response?.data?.data?.categories);
// //         setTotal(response?.data?.data?.count);
// //       }
// //     } catch (err: any) {
// //       console.log(err);
// //     }
// //   };

// //   useEffect(() => {
// //     getData();
// //   }, [params]);

// //   const handleTableChange = (pagination: any) => {
// //     const { current = 1, pageSize = 10 } = pagination;

// //     setParams(prev => ({
// //       ...prev,
// //       page: current,
// //       limit: pageSize,
// //     }));
// //   };

// //   return (
// //     <div>
// //       <Modals />
// //       <Table
// //         data={data}
// //         pagination={{
// //           current: params.page,
// //           pageSize: params.limit,
// //           total: total,
// //           showSizeChanger: true,
// //           pageSizeOptions: ["2", "5", "8"],
// //         }}
// //         onChange={handleTableChange}
// //       />
// //     </div>
// //   );
// // };

// // export default Index;

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { category } from "@service";
import { Table, Search } from "@components";
import {
  EditOutlined,
  DeleteOutlined,
  ArrowsAltOutlined,
} from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";

const Index = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const val = new URLSearchParams(location.search);
  const [params, setParams] = useState({
    search: val.get("search") || "",
    page: 1,
    limit: 10,
  });

  const getData = async () => {
    try {
      const response = await category.get(params);
      if (response.status === 200) {
        setData(response?.data?.data?.categories);
        setTotal(response?.data?.data?.count);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [params]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get("page");
    const limit = params.get("limit");
    const input_val = params.get("search");
    const find = input_val ? input_val : "";
    const pageNumber = page ? parseInt(page) : 1;
    const limitPage = limit ? parseInt(limit) : 10;
    setParams(prevParams => ({
      ...prevParams,
      page: pageNumber,
      search: find,
      limit: limitPage,
    }));
  }, [location.search]);

  const handleTableChange = (pagination: any) => {
    const { current = 1, pageSize = 10 } = pagination;
    setParams(prev => ({
      ...prev,
      page: current,
      limit: pageSize,
    }));
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", `${current}`);
    searchParams.set("limit", `${pageSize}`);
    navigate(`?${searchParams}`);
  };

  const columns: any = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (_text: string, _record: any, index: number) =>
        `${(params.page - 1) * params.limit + index + 1}`, // Calculate the row number based on pagination
    },
    { title: "Name", dataIndex: "name", key: "name", align: "center" },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      with: "50%",

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (_text: string) => (
        <div>
          <Space size={"middle"}>
            <Tooltip title="Edit">
              <Button
                type="default"
                icon={<EditOutlined />}
                // onClick={() => handleEdit(record)}
              />
            </Tooltip>
            <Tooltip title="Edit">
              <Button
                type="default"
                icon={<DeleteOutlined />}
                // onClick={() => handleEdit(record)}
              />
            </Tooltip>
            <Tooltip title="Edit">
              <Button
                type="default"
                icon={<ArrowsAltOutlined />}
                // onClick={() => handleEdit(record)}
              />
            </Tooltip>
          </Space>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Search params={params} setParams={setParams} />
      <Table
        data={data}
        columns={columns}
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
