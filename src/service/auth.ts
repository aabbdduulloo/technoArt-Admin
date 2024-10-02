import https from "./config";
import { Auth } from "@types";
const auth: Auth = {
  sign_in: data => https.post("/auth/sign-in", data),
  sign_up: data => https.post("/auth/admin/sign-up", data),
  get_admin: id => https.get(`/admin/${id}`),
  update_admin: (id, data) => https.patch(`/admin/${id}`, data),
  delete_admin: id => https.delete(`/admin/${id}`),
};
export default auth;
