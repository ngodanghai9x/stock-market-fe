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
  userId: number;
  username: string;
  fullName: string;
  role: string;

  email?: string;
  phone?: string;
  birthday?: string;
  money?: number;
  // createdAt: Timestamp;
}

export type ChangePasswordPayload = {
  oldPassword: string;
  password: string;
}