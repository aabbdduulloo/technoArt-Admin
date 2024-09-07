import https from "./config";
import { Category } from "@types";
const category: Category = {
  get: params => {
    const { search, limit, page } = params;
    const url = `/brand/search${search ? `?search=${search}` : ""}`;
    return https.get(url, {
      params: { limit, page },
    });
  },
  create: data => https.post("/brand/create", data),
};
export default category;
