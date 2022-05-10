import { AxiosResponse } from 'axios';
import { RoleIdType } from './constants';

export interface TokenInfo {
  userId: number;
  username: string;
  roleId: RoleIdType;
  role?: string;
  fullName: string;
  userStatus: string;
  // token?: string;
}

export type Value = string | number | boolean | null;
export class MyResponse2<T> {
  statusCode: number;
  message: string;
  data: T;
  constructor(data: T | any = null, statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
}

export class MyResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  constructor(res: AxiosResponse<any, any>, ignoreFail?: boolean) {
    if (res.status !== 200 && !ignoreFail) {
      throw Error(res.data?.message || `Có lỗi xảy ra, vui lòng thử lại sau`);
    }
    this.statusCode = res.status;
    this.data = res.data?.data;
    this.message = res.data?.message;
  }
}

export type FileState = {
  // fileId: string;
  file: File;
  fileName: string;
  base64: string;
  magicBytes?: string;
};
