export interface BaseAuthFormData {
  login: string;
  password: string;
}

export interface SignUpFormData extends BaseAuthFormData {
  name: string;
  confirmPassword: string;
}
