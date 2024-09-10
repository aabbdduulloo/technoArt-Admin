import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { category } from "@service";
import { Table, Search } from "@components";
import { Button, Space, Tooltip } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ArrowsAltOutlined,
} from "@ant-design/icons";
import { Modals } from "@components"; // Import qilish

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

  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (_text: string, _record: any, index: number) =>
        `${(params.page - 1) * params.limit + index + 1}`,
    },
    { title: "Name", dataIndex: "name", key: "name", align: "center" },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (_text: string, record: any) => (
        <Space size={"middle"}>
          <Tooltip title="Edit">
            <Button type="default" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="Delete">
            <Button type="default" icon={<DeleteOutlined />} />
          </Tooltip>
          <Tooltip title="View">
            <Button type="default" icon={<ArrowsAltOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Search params={params} setParams={setParams} />
      <Modals onSuccess={getData} />{" "}
      {/* Yangi kategoriya qo'shilgandan keyin ma'lumotlarni yangilash */}
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
