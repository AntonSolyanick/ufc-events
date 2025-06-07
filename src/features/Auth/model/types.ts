export interface BaseAuthFormData {
  email: string;
  password: string;
}

export interface SignUpFormData extends BaseAuthFormData {
  name: string;
  confirmPassword: string;
}
