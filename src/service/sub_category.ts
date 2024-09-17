import https from "./config";
import { SubCategory } from "@types";
const subcategory: SubCategory = {
  get_subcategory: (id, params) =>
    https.get(`/sub-category/search/${id}`, { params }),
  create_subcategory: data => https.post("/sub-category/create", data),
  update_subcategory: (id: any, data: any) =>
    https.patch(`/sub-category/update/${id}`, data),
  delete_subcategory: id => https.delete(`/sub-category/delete/${id}`),
};
export default subcategory;
