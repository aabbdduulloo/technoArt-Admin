import {
  AppstoreOutlined,
  TagsOutlined,
  ShopOutlined,
} from "@ant-design/icons";

const routes = [
  {
    title: "Products",
    path: "/main/products",
    icon: <AppstoreOutlined />,
  },
  {
    title: "Categories",
    path: "/main/categories",
    icon: <TagsOutlined />,
  },
  {
    title: "Brands",
    path: "/main/brands",
    icon: <ShopOutlined />,
  },
  {
    title: "Brand Category",
    path: "/main/brand-category",
    icon: <ShopOutlined />,
  },
];

export default routes;
