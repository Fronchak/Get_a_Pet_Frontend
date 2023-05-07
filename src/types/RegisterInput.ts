type RegisterInputs = {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type RegisterInputsKeys = keyof RegisterInputs;

export default RegisterInputs;

