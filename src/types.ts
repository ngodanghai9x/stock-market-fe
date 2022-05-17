import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
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
  status: number;
  message: string;
  data: T;
  constructor(data: T | any = null, status: number, message: string) {
    this.status = status;
    this.data = data;
    this.message = message;
  }
}

export class MyResponse<T> {
  status: number;
  message: string;
  data: T;
  constructor(res: AxiosResponse<any, any>, ignoreFail?: boolean) {
    this.status = res.status;
    this.data = res.data?.data;
    this.message = res.data?.message;
    if (res.status !== 200 && !ignoreFail) {
      this.message = res.data?.message || `Có lỗi xảy ra, vui lòng thử lại sau`;
      // toast(res.data?.message || `Có lỗi xảy ra, vui lòng thử lại sau`);
      // throw Error(res.data?.message || `Có lỗi xảy ra, vui lòng thử lại sau`);
    }
  }
}

export type FileState = {
  // fileId: string;
  file: File;
  fileName: string;
  base64: string;
  magicBytes?: string;
};
