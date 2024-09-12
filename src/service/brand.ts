import https from "./config";
import { Brand } from "@types";
const brand: Brand = {
  get: params => https.get("/brand/search", { params }),
  create: (data: any) => https.post("/brand/create", data),
  update: (id, data) => https.patch(`/brand/update/${id}`, data),
  delete: id => https.delete(`/brand/delete/${id}`),
};
export default brand;
