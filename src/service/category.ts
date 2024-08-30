import https from "./config";
import { Category } from "@types";
const category: Category = {
  get: params => {
    const { search = "", limit, page } = params;

    // Construct the URL dynamically
    const url = `https://texnoshop.ilyosbekdev.uz/category/search${
      search ? `=${search}` : ""
    }`;

    return https.get(url, {
      params: { limit, page },
    });
  },
  // update: ()=> https.put(),
  // delete: ()=> https.delete()
};
export default category;
