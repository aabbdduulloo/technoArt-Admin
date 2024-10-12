import https from "./config";
import { ProductDetailRequest } from "@types";

const productDetail: ProductDetailRequest = {
  create_product_detail: data => https.post("/product-detail/create", data),
  delete_product_detail: id => https.delete(`/product-detail/delete/${id}`),
  update_product_detail: (id, data) =>
    https.patch(`/product-detail/update/${id}`, data),
};

export default productDetail;
