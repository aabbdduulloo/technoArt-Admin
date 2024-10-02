/* eslint-disable react-hooks/exhaustive-deps */
import { subcategory, category } from "@service";
import { SubCategoryCreate } from "@modals";
import { Table, Search, ConfirmDelete } from "@components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SubCategoryUpdate } from "@modals";
import { Button, notification, Space, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";

const Index = () => {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedCategorySingle, setSelectedCategorySingle] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const val = new URLSearchParams(location.search);
  const { id } = useParams();
  const navigate = useNavigate();

  const [params, setParams] = useState({
    search: val.get("search") || "",
    page: 1,
    limit: 10,
  });

  const handleEditClick = (id: string, name: string) => {
    setSelectedCategorySingle({ id, name });
    setIsUpdateModalVisible(true);
  };

  const handleModalClose = () => {
    setIsUpdateModalVisible(false);
    setSelectedCategorySingle(null);
  };

  const handleDelete = async (id: any) => {
    try {
      await subcategory.delete_subcategory(id);
      notification.success({
        message: "Single Category deleted successfully",
      });
      getData();
    } catch (err: any) {
      notification.error({
        message: "Error deleting category",
        description: err.message,
      });
    }
  };

  const getCategories = async () => {
    try {
      const response = await category.get(params);
      if (response.status === 200) {
        setCategories(response?.data?.data?.categories || []);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      const response = await subcategory.get_subcategory(id, params);
      if (response.status === 200) {
        setData(response?.data?.data?.subcategories || []);
        setTotal(response?.data?.data?.count || 0);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (categories.length > 0) {
      getData();
    }
  }, [categories]);

  useEffect(() => {
    getCategories();
  }, [params]);

  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (_text: string, _record: any, index: number) =>
        `${(params.page - 1) * params.limit + index + 1}`,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
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
        </Space>
      ),
    },
  ];

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

  return (
    <div>
      <Search params={params} setParams={setParams} />
      <SubCategoryCreate data={data} setData={setData} />
      <Table
        data={data}
        columns={columns}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: ["2", "5", "10", "20"],
        }}
        onChange={handleTableChange}
      />
      {selectedCategorySingle && (
        <SubCategoryUpdate
          visible={isUpdateModalVisible}
          onClose={handleModalClose}
          onSuccess={() => {
            getData();
            handleModalClose();
          }}
          categoryId={selectedCategorySingle.id}
          initialName={selectedCategorySingle.name}
        />
      )}
    </div>
  );
};

export default Index;
