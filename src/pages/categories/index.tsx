import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { category } from "@service";
import { Table, Search, ConfirmDelete } from "@components";
import { Button, Space, Tooltip } from "antd";
import { EditOutlined, ArrowsAltOutlined } from "@ant-design/icons";
import { CategoryCreate } from "@modals";
import { CategoryUpdate } from "@modals";
import { notification } from "antd";

const Index = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<{
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

  const handleEditClick = (id: string, name: string) => {
    setSelectedCategory({ id, name });
    setIsUpdateModalVisible(true);
  };

  const handleModalClose = () => {
    setIsUpdateModalVisible(false);
    setSelectedCategory(null);
  };
  const moveSingle = (id: number) => {
    console.log(id);
    navigate(`/main/categories/${id}`);
  };

  const handleDelete = async (id: any) => {
    try {
      await category.delete(id);
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
              onClick={() => handleEditClick(record.id, record.name)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <ConfirmDelete id={record.id} deleteItem={handleDelete} />
          </Tooltip>
          <Tooltip title="View">
            <Button
              type="default"
              icon={<ArrowsAltOutlined />}
              onClick={() => moveSingle(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Search params={params} setParams={setParams} />
      <div>
        <CategoryCreate onSuccess={getData} />
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

        {selectedCategory && (
          <CategoryUpdate
            visible={isUpdateModalVisible}
            onClose={handleModalClose}
            onSuccess={() => {
              getData();
              handleModalClose();
            }}
            categoryId={selectedCategory.id}
            initialName={selectedCategory.name}
          />
        )}
      </div>
    </>
  );
};

export default Index;
