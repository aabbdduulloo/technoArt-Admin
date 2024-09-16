import { subcategory, category } from "@service";
import { SubCategoryCreate } from "@modals";
import { Table, Search } from "@components";
import { useEffect, useState } from "react";

const Index = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState([]);
  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 10,
  });
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
          setData(response?.data?.data?.categories);
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
  }, []);

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
    },
  ];

  const handleTableChange = (pagination: any) => {
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });
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
    </div>
  );
};

export default Index;
