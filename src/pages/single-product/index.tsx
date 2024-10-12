/* eslint-disable react-hooks/exhaustive-deps */
import { product } from "@service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductDetail } from "@modals";
import { Tooltip } from "antd";

const Index = () => {
  const [productData, setProductData] = useState<any>(null); // Product data
  const [detail, setDetail] = useState<any>({}); // Product detail
  const { id } = useParams<{ id: any }>(); // Params to get product ID

  const getProductData = async () => {
    try {
      const response = await product.get_product_by_id(id);
      if (response.status === 200) {
        setDetail(response?.data?.data?.product_detail || {});
        setProductData(response.data.data.product); // Corrected product state
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <>
      {Object.keys(detail).length === 0 ? ( // Checking if detail is empty
        <div className="flex flex-col gap-[15px]">
          <div className="flex items-center gap-[20px]">
            <h2 className="text-[24px] font-semibold">Product name:</h2>
            <p className="text-[24px] font-semibold text-[#d55200]">
              {productData?.name || "N/A"} {/* Safeguard for undefined */}
            </p>
          </div>

          <div className="flex items-center gap-[20px]">
            <h2 className="text-[24px] font-semibold">Product Price:</h2>
            <p className="text-[24px] font-semibold text-[#d55200]">
              {productData?.price || "N/A"} {/* Safeguard for undefined */}
            </p>
          </div>
          <div className="flex items-center gap-[20px]">
            <h2 className="text-[24px] font-semibold">Product detail</h2>
            <Tooltip title="Add Product Detail">
              <ProductDetail />
            </Tooltip>
          </div>
        </div>
      ) : (
        <div className="flex h-[85vh]">
          <div className="w-[50%] bg-sky-100">
            <img src={productData?.images || ""} alt={productData?.name} />
          </div>
          <div className="w-[50%] flex justify-center pt-[100px]">
            <div className="flex flex-col gap-[20px] w-[100%] px-[100px]">
              <div className="w-[100%] flex justify-center pb-[30px] px-[20px] ">
                <h1 className="text-[25px] font-semibold">
                  {productData?.name || "N/A"}
                </h1>
              </div>
              <div className="w-[100%] flex gap-[50px] justify-between items-center py-[5px] border-b-[1px] border-b-[lightgray]">
                <h2 className="text-[20px] font-semibold">Description:</h2>
                <p className="text-[17px] font-medium text-[gray]">
                  {detail.description || "N/A"}
                </p>
              </div>
              <div className="w-[100%] flex justify-between items-center py-[10px] border-b-[1px] border-b-[lightgray]">
                <h2 className="text-[20px] font-semibold">Product color</h2>
                <p className="text-[17px] font-medium">
                  {detail.colors || "N/A"}
                </p>
              </div>
              <div className="w-[100%] flex justify-between items-center py-[10px] border-b-[1px] border-b-[lightgray]">
                <h2 className="text-[20px] font-semibold">Product quantity</h2>
                <p className="text-[17px] font-medium">
                  {detail.quantity || "N/A"}
                </p>
              </div>
              <div className="w-[100%] flex justify-between items-center py-[10px] border-b-[1px] border-b-[lightgray]">
                <h2 className="text-[20px] font-semibold">Product discount</h2>
                <p className="text-[17px] font-medium">
                  {detail.discount || 0}%
                </p>
              </div>
              <div className="w-[100%] flex justify-between items-center py-[10px] border-b-[1px] border-b-[lightgray]">
                <h2 className="text-[20px] font-semibold">Product price</h2>
                <span className="flex items-center gap-[10px]">
                  <p className="text-[gray]">
                    <del>{productData?.price}$</del>
                  </p>
                  <p className="text-[17px] font-medium">
                    {productData?.price -
                      productData?.price * (detail.discount / 100)}
                    $
                  </p>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
