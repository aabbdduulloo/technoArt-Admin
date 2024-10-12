import https from "./config";
import { Product } from "@types";

const product: Product = {
  get_products: params => https.get("/products/search", { params }),
  get_product_by_id: id => https.get(`/products/${id}`),
  create_product: data => https.post("/products/create", data),
  delete_product: id => https.delete(`/products/delete/${id}`),
  update_product: (id: number, data: any) =>
    https.patch(`/products/update/${id}`, data),
  price: undefined,
  name: undefined,
};

export default product;
