import { RoleIdType } from './constants';

export interface TokenInfo {
  userId: number;
  username: string;
  roleId: RoleIdType;
  role: string;
  fullName: string;

  // token?: string;
}

export type Value = string | number | boolean | null;
export class MyResponse<T> {
  statusCode: number;
  data: T & {
    message: string;
  };
  constructor(data: T | any = null, statusCode: number) {
    this.statusCode = statusCode;
    this.data = { ...(data || null), message: data?.message || '' };
  }
}
