/* eslint-disable react-hooks/exhaustive-deps */
import { subcategory, category } from "@service";
import { SubCategoryCreate } from "@modals";
import { Table, Search } from "@components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubCategoryDelete } from "@modals";
import { SubCategoryUpdate } from "@modals";
import { Button, Space, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";

const Index = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedCategorySingle, setSelectedCategorySingle] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const val = new URLSearchParams(location.search);
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
  const getCategories = async () => {
    try {
      const response = await category.get(params);
      if (response.status === 200) {
        setCategories(response?.data?.data?.categories);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      const categoryId = categories.length > 0 ? categories[0].id : null;

      if (categoryId) {
        const response = await subcategory.get_subcategory(categoryId, params);
        if (response.status === 200) {
          console.log("Response Data:", response?.data?.data?.categories);
          setData(response?.data?.data?.subcategories);
          setTotal(response?.data?.data?.count);
        }
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
            <SubCategoryDelete
              record={{ id: record.id, name: record.name }}
              onSuccess={getData}
            />
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
      <SubCategoryCreate />{" "}
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
