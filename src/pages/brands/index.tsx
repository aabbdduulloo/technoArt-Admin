import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { brand } from "@service";
import { Table, Search } from "@components";
import { Button, Space, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { BrandCreate } from "@modals";
import { BrandUpdate } from "@modals";
import { BrandDelete } from "@modals";

const Index = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
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
      const response = await brand.get(params);
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

  const handleEditClick = (id: string, name: string) => {
    setSelectedBrand({ id, name });
    setIsUpdateModalVisible(true);
  };

  const handleModalClose = () => {
    setIsUpdateModalVisible(false);
    setSelectedBrand(null);
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
      render: (_text: string, record: any) => (
        <Space size={"middle"}>
          <Tooltip title="Edit">
            <Button
              type="default"
              icon={<EditOutlined />}
              onClick={() => handleEditClick(record.id, record.name)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <BrandDelete
              record={{ id: record.id, name: record.name }}
              onSuccess={getData}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Search params={params} setParams={setParams} />
      <BrandCreate onSuccess={getData} />
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

      {/* BRAND yangilash modal */}
      {selectedBrand && (
        <BrandUpdate
          visible={isUpdateModalVisible}
          onClose={handleModalClose}
          onSuccess={() => {
            getData();
            handleModalClose();
          }}
          brandId={selectedBrand.id}
          initialName={selectedBrand.name}
        />
      )}
    </div>
  );
};

export default Index;
