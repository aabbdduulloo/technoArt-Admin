import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { brand } from "@service";
import { Table, Search, ConfirmDelete } from "@components";
import { Button, notification, Space, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { BrandCreate } from "@modals";
import { BrandUpdate } from "@modals";

const Index = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState<{
    description: string;
    id: string;
    name: string;
    categoryId: number;
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
        setData(response?.data?.data?.brands);
        setTotal(response?.data?.data?.count);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleEditClick = (
    id: string,
    name: string,
    description: string,
    categoryId: any
  ) => {
    setSelectedBrand({ id, name, description, categoryId });
    setIsUpdateModalVisible(true);
  };

  const handleModalClose = () => {
    setIsUpdateModalVisible(false);
    setSelectedBrand(null);
  };

  const handleDelete = async (id: any) => {
    try {
      await brand.delete(id);
      notification.success({
        message: "Category deleted successfully",
      });
      getData();
    } catch (error: any) {
      notification.error({
        message: "Failed to delete category",
        description: error?.response?.data?.message || "Something went wrong",
      });
    }
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
              onClick={() =>
                handleEditClick(
                  record.id,
                  record.name,
                  record.description,
                  record.categoryId
                )
              }
            />
          </Tooltip>
          <Tooltip title="Delete">
            <ConfirmDelete id={record.id} deleteItem={handleDelete} />
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
          initialDescription={selectedBrand.description}
          initialCategoryId={selectedBrand.categoryId}
        />
      )}
    </div>
  );
};

export default Index;
