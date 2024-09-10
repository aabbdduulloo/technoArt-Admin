import Cookies from "js-cookie";

export const saveToken = (title: string, value: string) => {
  Cookies.set(title, value);
};

export const getToken = (title: string) => {
  return Cookies.get(title);
};

export const removeToken = (title: string) => {
  Cookies.remove(title);
};
