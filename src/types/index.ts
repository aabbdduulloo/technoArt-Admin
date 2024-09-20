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
  get_brand_category: (params: any) => any;
  get_brand_category_by_brand: (id: any) => any;
  create_brand_category: (data: any) => any;
  delete_brand_category: (id: number) => any;
  update_brand_category: (id: number, data: any) => any;
}
