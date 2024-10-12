import {
  AppstoreOutlined,
  TagsOutlined,
  ShopOutlined,
  SettingOutlined,
  RadiusSettingOutlined,
  BorderTopOutlined,
  StockOutlined,
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
    icon: <BorderTopOutlined />,
  },
  {
    title: "Ads",
    path: "/main/ads",
    icon: <RadiusSettingOutlined />,
  },
  {
    title: "Stock",
    path: "/main/stock",
    icon: <StockOutlined />,
  },
  {
    title: "Settings",
    path: "/main/settings",
    icon: <SettingOutlined />,
  },
];

export default routes;
