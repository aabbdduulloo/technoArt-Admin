interface SignIn {
  phone_number: string | number;
  passsword: string | number;
}

export interface Auth {
  sign_in: (data: SignIn) => unknown;
}
