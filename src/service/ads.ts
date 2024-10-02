import https from "./config";
import http from "./config";
import { Ads } from "@types";
const ads: Ads = {
  get_ads: () => http.get("/ads"),
  create_ads: data => http.post("/ads/create", data),
  delete_ads: id => http.delete(`/ads/delete/${id}`),
  update: (id, data) => https.patch(`/ads/update/${id}`, data),
  get: function (): unknown {
    throw new Error("Function not implemented.");
  },
};
export default ads;
