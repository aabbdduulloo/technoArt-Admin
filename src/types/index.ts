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
  create: (name: string | number) => Promise<any>;
  update: (id: string | number, data: any) => Promise<any>;
  delete: (id: string | number, data: any) => Promise<any>;
}
