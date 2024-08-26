import https from "./config";

const category = {
  create: (data: any) => https.post("/category/create", data),
  get: () => https.get("/category/search", { params: { page: 1, limit: 50 } }),
};

export default category;
