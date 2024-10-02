// ========= GLOBAL ========
interface IParams {
  limit: number;
  page: number;
  search?: string;
}
// ========= AUTH ==========

interface SignIn {
  phone_number: string | undefined;
  password: string | undefined;
}

export interface Auth {
  sign_in: (data: SignIn) => any;
  sign_up: (data: SignIn) => any;
  get_admin: (id: any) => any;
  update_admin: (id: any, data: any) => any;
  delete_admin: (id: number) => any;
}

// ==========  CATEGORY =======
export interface Category {
  get: (params: IParams) => any;
  create: (name: any | number) => Promise<any>;
  update: (id: string | number, data: any) => Promise<any>;
  delete: (id: string | number) => Promise<any>;
}

// ////////  SubCategoty ///////
export interface SubCategory {
  get_subcategory: (id: any, params: any) => any;
  create_subcategory: (data: any) => any;
  update_subcategory: (id: number, data: any) => any;
  delete_subcategory: (id: number) => any;
}

// ==========  Brand =======
export interface Brand {
  get: (params: IParams) => any;
  get_brands_by_category: (id: any) => any;
  create: (name: any | number) => Promise<any>;
  update: (id: string | number, data: any) => Promise<any>;
  delete: (id: string | number) => Promise<any>;
}

// ------------ Brand Category ----------------

export interface BrandCategory {
  delete(id: any): unknown;
  get_brand_category: (params: any) => any;
  get_brand_category_by_brand: (id: any) => any;
  create_brand_category: (data: any) => any;
  delete_brand_category: (id: number) => any;
  update_brand_category: (id: number, data: any) => any;
}

// ------------ Ads ----------------

export interface Ads {
  get(params: { search: string; page: number; limit: number }): unknown;
  get_ads: () => any;
  create_ads: (data: any) => any;
  delete_ads: (id: number) => any;
  update: (id: number, data: any) => any;
}

// ------------ Product ----------------

export interface Product {
  price: ReactNode;
  name: ReactNode;
  get_products: (params: any) => any;
  get_product_by_id: (id: number) => any;
  create_product: (data: Product) => any;
  delete_product: (id: number) => any;
  update_product: (id: number, data: any) => any;
}
