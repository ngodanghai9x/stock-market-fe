import axiosClient from '../lib/request';
import { MyResponse } from '../types';
import { CreateStockOrderPayload, EditUserPayload, GetAllStockOrderResponse, GetUser, GetUserOrdersResponse } from './api-user.type';
import { CitizenIdentity, User } from './api-admin.type';

const baseUrl = `${process.env.REACT_APP_API_HOST}`;

export const getAllOrder = async () => {
  const res = await axiosClient.get(`${baseUrl}/stock-orders`);
  // if (res.status !== 200) {
  //   throw Error(`Có lỗi xảy ra, vui lòng thử lại vào lúc khác`);
  // }
  return new MyResponse<GetAllStockOrderResponse>(res).data;
};

export const getUserOrders = async (userId: number) => {
  const res = await axiosClient.get(`${baseUrl}/stock-orders/user/${userId}`);
  return new MyResponse<GetUserOrdersResponse>(res).data;
};

export const getUserHistory = async (userId: number) => {
  const res = await axiosClient.get(`${baseUrl}/stock-orders/user-history/${userId}`);
  return new MyResponse<GetUserOrdersResponse>(res).data;
};

export const getUserById = async (userId: number, username?: string) => {
  const res = await axiosClient.get(`${baseUrl}/user/${userId}?username=${encodeURIComponent(username || '')}`);
  const data = new MyResponse<GetUser>(res).data;
  return data;
  // if (res.status !== 200) {
  //   throw Error(`Có lỗi xảy ra, vui lòng thử lại vào lúc khác`);
  // }
  // return new MyResponse<{ user: User; citizenIdentity: CitizenIdentity | null }>(res);
};

export const editUserInfo = (payload: EditUserPayload, userId: number) => {
  return axiosClient.put(`${baseUrl}/user/${userId}`, {
    ...payload,
  });
};

export const createStockOrder = (payload: CreateStockOrderPayload) => {
  return axiosClient.post(`${baseUrl}/stock-order/`, {
    ...payload,
  });
};

export const getWorldIndexes = async () => {
  const res = await axiosClient.get(`https://athenaaws.tcbs.com.vn/athena/v1/worldIndexes`);
  return new MyResponse<{
    data: {
      symbol: string;
      value: number;
      changePercent: number;
      enName: string;
      viName: string;
    }[];
  }>(res).data;
};

export const getProductIndexes = async () => {
  const res = await axiosClient.get(`https://athenaaws.tcbs.com.vn/athena/v1/futureIndexes`);
  return new MyResponse<{
    data: {
      symbol: string;
      value: number;
      changePercent: number;
      enName: string;
      viName: string;
    }[];
  }>(res).data;
};

export const getDerivativeIndexes = async () => {
  const res = await axiosClient.get(`https://athenaaws.tcbs.com.vn/athena/v1/indexSnaps?indexes=1,2,3,4,5`);
  return new MyResponse<{
    data: {
      indexNumber: number;
      index: number;
      change: number;
      changePercent: number;
      volume: number;
      value: number;
      increase: number;
      decrease: number;
      notChange: number;
      session: string;
      ceilIncrease: number;
      floorDecrease: number;
      preIndex: number;
    }[];
  }>(res).data;
};

export const getCurrencyIndexes = async () => {
  // ,EUR_USD,USD_JPY,USD_CNY
  const res = await axiosClient.get(
    `https://finfo-api.vndirect.com.vn/v4/currencies/latest?order=tradingDate&where=locale:VN&filter=code:USD_VND,EUR_VND,CNY_VND,JPY_VND`
  );
  return new MyResponse<{
    data: {
      code: 'USD_VND';
      codeName: 'Tỷ giá USD/VND';
      tradingDate: '2022-04-28';
      openPrice: 22950.0;
      highPrice: 22967.0;
      lowPrice: 22950.0;
      closePrice: 22958.0;
      change: -18.0;
      changePct: -0.0783;
      locale: 'VN';
    }[];
  }>(res);
};
