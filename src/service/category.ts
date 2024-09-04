import https from "./config";
import { Category } from "@types";

const category: Category = {
  get: params => {
    const { search = "", limit, page } = params;

    // URLni dinamik yaratish
    const url = `https://texnoshop.ilyosbekdev.uz/category/search${
      search ? `=${search}` : ""
    }`;

    return https.get(url, {
      params: { limit, page },
    });
  },

  create: (data: any) => {
    const token = localStorage.getItem("authToken"); // Tokenni olish

    return https.post("/category/create", data, {
      headers: {
        Authorization: `Bearer ${token}`, // Tokenni headerda yuborish
      },
    });
  },
};

export default category;
