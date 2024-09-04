/* eslint-disable react-hooks/exhaustive-deps */

import { category } from "@service";

import { useEffect, useState } from "react";
import { Table } from "@components";
import { Modal } from "@components";

const Index = () => {
  const [data, setData] = useState([]);
  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 10,
  });
  const [total, setTotal] = useState(0);

  const getData = async () => {
    try {
      const response = await category.get(params);
      if (response.status === 200) {
        setData(response?.data?.data?.categories);
        setTotal(response?.data?.data?.count); // Assuming the total count is provided by the API
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

    // Update params with the new pagination data
    setParams(prev => ({
      ...prev,
      page: current,
      limit: pageSize,
    }));
  };

  return (
    <div>
      <h1>Categories</h1>
      <Modal />
      <Table
        data={data}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: ["2", "5", "8"],
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default Index;
