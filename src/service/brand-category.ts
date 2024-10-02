import https from "./config";
import { BrandCategory } from "@types";
const brandcategory: BrandCategory = {
  get_brand_category: params => https.get("/brand-category/search", { params }),
  get_brand_category_by_brand: id =>
    https.get(`/brand-category/brand/${id}?limit=1000&page=1`),
  create_brand_category: data => https.post("/brand-category/create", data),
  update_brand_category: (id, data) =>
    https.patch(`/brand-category/update/${id}`, data),
  delete_brand_category: id => https.delete(`/brand-category/delete/${id}`),
  delete: function (): unknown {
    throw new Error("Function not implemented.");
  },
};
export default brandcategory;
