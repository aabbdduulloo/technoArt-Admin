import https from "./config";
import { Brand } from "@types";
const brand: Brand = {
  get: params => https.get("/brand/search", { params }),
  get_brands_by_category: id =>
    https.get(`/brand/category/${id}?limit=1000&page=1`),
  create: data => https.post("/brand/create", data),
  update: (id, data) => https.patch(`/brand/update/${id}`, data),
  delete: id => https.delete(`/brand/delete/${id}`),
};
export default brand;
