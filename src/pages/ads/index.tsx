import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ads } from "@service";
import { Table, ConfirmDelete } from "@components";
import { Button, Image, notification, Space, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { AdsCreate } from "@modals";
import { AdsUpdate } from "@modals";

const Index = () => {
  const [data, setData] = useState([]);
  const [total] = useState(0);
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
      const response = await ads.get_ads();
      if (response.status === 200) {
        setData(response?.data?.data);
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
    setSelectedCategory({ id, name });
    setIsUpdateModalVisible(true);
  };

  const handleModalClose = () => {
    setIsUpdateModalVisible(false);
    setSelectedCategory(null);
  };

  const handleDelete = async (id: any) => {
    try {
      await ads.delete_ads(id);
      notification.success({
        message: "Ads deleted successfully",
      });
      getData();
    } catch (error: any) {
      notification.error({
        message: "Failed to delete ads",
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

    {
      title: "Image",
      dataIndex: "file",
      key: "file",
      align: "center",
      render: (_text: string, record: any) => (
        <Image
          width={50}
          src={
            record?.file?.url
              ? record.file.url
              : "https://repost.uz/storage/uploads/370-1656401821-avto-post-material.jpeg" // Agar rasm mavjud bo'lmasa, standart rasm
          }
          preview={{
            src:
              record?.file?.url ||
              "https://repost.uz/storage/uploads/370-1656401821-avto-post-material.jpeg", // Agar preview yo'q bo'lsa
          }}
        />
      ),
    },

    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      align: "center",
    },

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
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-end items-center py-[20px]">
        {" "}
        <AdsCreate onSuccess={getData} />
      </div>
      <div>
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
          <AdsUpdate
            visible={isUpdateModalVisible}
            onClose={handleModalClose}
            onSuccess={() => {
              getData();
              handleModalClose();
            }}
            initialName={selectedCategory.name}
            adsId={0}
          />
        )}
      </div>
    </>
  );
};

export default Index;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function setTotal(_count: any) {
  throw new Error("Function not implemented.");
}
