import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import {
  SignUp,
  SignIn,
  MainLayout,
  Products,
  Categories,
  Brands,
  BrandCategory,
  SingleCategory,
  SingleProduct,
  Ads,
  Settings,
} from "@pages";
const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="main/*" element={<MainLayout />}>
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/:id" element={<SingleCategory />} />
          <Route path="products/:id" element={<SingleProduct />} />
          <Route path="brands" element={<Brands />} />
          <Route path="brand-category" element={<BrandCategory />} />
          <Route path="ads" element={<Ads />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};
export default Index;
