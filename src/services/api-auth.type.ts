export type RegisterPayload = {
  username: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  email: string;
}

export type LoginPayload = {
  username: string;
  password: string;
}

export type User = {
  username: string;
  fullName: string;
  email?: string;
}