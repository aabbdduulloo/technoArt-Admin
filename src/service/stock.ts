import https from "./config";
import { StockRequest } from "@types";
const stock: StockRequest = {
  get_stocks: async () => https.get("/stock"),
  get_stock_by_brand: id => https.get(`/stock/brand/${id}`),
  create_stock: data => https.post("/stock/create", data),
  delete_stock: id => https.delete(`/stock/delete/${id}`),
  update_stock: (id, data) => https.patch(`/stock/update/${id}`, data),
};
export default stock;
