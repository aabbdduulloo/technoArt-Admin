/* eslint-disable react-hooks/exhaustive-deps */
import { product } from "@service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";

const Index = () => {
  const [producte, setProducte]: any = useState([]);
  const [detail, setDetail]: any = useState({});
  const { id }: any = useParams();

  const getCategories = async () => {
    try {
      const response = await product.get_product_by_id(id);
      if (response.status === 200) {
        setDetail(response?.data?.data?.product_detail || []);
        setProducte(response.data.data.product);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {detail === null ? (
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center gap-4">
            <p className="text-[20px]">Product name:</p>
            <p className="text-[20px] font-medium text-[#D55200]">
              {producte?.name}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-[20px]">Product price:</p>
            <p className="text-[20px] font-medium text-[#D55200]">
              {producte?.price} $
            </p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-[20px]">Product detail:</p>
            {/* <ProductDetail /> */}
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            {detail?.images && (
              <ImageGallery
                autoPlay={false}
                infinite={true}
                thumbnailPosition={"left"}
                showPlayButton={false}
                showFullscreenButton={true}
                items={producte?.images?.map((image: any) => {
                  return {
                    original: image,
                    thumbnail: image,
                  };
                })}
              />
            )}
          </div>
          <div className="w-[45%] px-3">
            <h1 className="font-medium text-[24px] text-center mb-5">
              {producte?.name}
            </h1>
            <div className="flex flex-col gap-y-3">
              <div className="flex gap-3">
                <p className="font-medium text-[18px]">Description:</p>
                <p className="text-[16px]">{producte?.description}</p>
              </div>
              <div className="flex gap-3 justify-between border-b">
                <p className="font-medium text-[18px]">Product colors:</p>
                <p className="text-[16px]">
                  {detail?.colors?.map((e: any) => (
                    <span key={e}>
                      {e}
                      {", "}
                    </span>
                  ))}
                </p>
              </div>
              <div className="flex gap-3 justify-between border-b">
                <p className="font-medium text-[18px]">Product quantity:</p>
                <p className="text-[16px]">{detail?.quantity}</p>
              </div>
              <div className="flex gap-3 justify-between border-b">
                <p className="font-medium text-[18px]">Product discount:</p>
                <p className="text-[16px]">{detail?.discount}%</p>
              </div>
              <div className="flex gap-3 justify-between border-b items-end">
                <p className="font-medium text-[18px]">Product price:</p>
                <div>
                  {detail?.discount === 0 ? (
                    ""
                  ) : (
                    <del className="text-[16px] text-[#00000082]">
                      {detail?.price} $
                    </del>
                  )}
                  <p className="text-[16px]">
                    {Math.round(
                      detail?.price - (detail?.price / 100) * detail?.discount
                    )}{" "}
                    $
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 flex gap-3"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
