import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { brandcategory } from "@service";
import { Table, Search } from "@components";
import { Button, Space, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { BrandCategoryCreate } from "@modals";
import { BrandCategoryUpdate } from "@modals";
import { BrandCategoryDelete } from "@modals";

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
      const response = await brandcategory.get_brand_category(params);
      if (response.status === 200) {
        setData(response?.data?.data?.brandCategories);
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
            <BrandCategoryDelete
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
      <BrandCategoryCreate onSuccess={getData} />
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
        <BrandCategoryUpdate
          visible={isUpdateModalVisible}
          onClose={handleModalClose}
          onSuccess={() => {
            getData();
            handleModalClose();
          }}
          brandId={selectedBrand.id}
          initialName={selectedBrand.name}
          initialCategoryId={selectedBrand.categoryId}
        />
      )}
    </div>
  );
};

export default Index;
