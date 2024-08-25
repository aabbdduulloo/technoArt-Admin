import axios from "axios";
import { getToken } from "@token-service";

const https = axios.create({
  baseURL: "https://texnoshop.ilyosbekdev.uz",
});

https.interceptors.request.use(
  config => {
    const access_token = getToken("access_token");
    if (typeof access_token === "string") {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default https;
