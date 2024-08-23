import axios from "axios";
import { getToken } from "@token-service";

const https = axios.create({
  baseURL: "https://texnoshop.ilyosbekdev.uz",
});

https.interceptors.request.use(config => {
  const access_token = getToken("access_token");
  if (access_token) {
    config.headers["Authorization"] = `Bearer ${access_token}`;
  }
  return config;
});

export default https;
