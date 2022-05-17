import axiosClient from '../lib/request';
import { MyResponse } from '../types';
import {
  CreateStockOrderPayload,
  DrawMoneyPayload,
  EditUserPayload,
  GetAllStockOrderResponse,
  GetUser,
  GetUserOrdersResponse,
  Index,
  TotalIndex,
} from './api-user.type';
import { CitizenIdentity, User } from './api-admin.type';
import axios from 'axios';
import { INDEX_LIST } from '../constants';

const baseUrl = `${process.env.REACT_APP_API_HOST}`;

export const getAllOrder = async () => {
  const res = await axiosClient.get(`${baseUrl}/stock-orders`);
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
  return new MyResponse<GetUser>(res).data;
};

export const editUserInfo = async (payload: EditUserPayload, userId: number) => {
  const res = await axiosClient.put(`${baseUrl}/user/${userId}`, {
    ...payload,
  });
  return new MyResponse<any>(res);
};

export const editUserSecretInfo = async (payload: EditUserPayload, userId: number) => {
  const res = await axiosClient.put(`${baseUrl}/user/${userId}/secret`, {
    ...payload,
  });
  return new MyResponse<any>(res);
};

export const createStockOrder = async (payload: CreateStockOrderPayload) => {
  const res = await axiosClient.post(`${baseUrl}/stock-order/`, {
    ...payload,
  });
  return new MyResponse<any>(res);
};

export const cancelStockOrder = async (orderId: number) => {
  const res = await axiosClient.delete(`${baseUrl}/stock-order/${orderId}`);
  return new MyResponse<any>(res);
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
  const res = await axiosClient.get(`${baseUrl}/external/indexSnaps?indexes=${INDEX_LIST.join(',')}`);
  return new MyResponse<{
    data: Index[];
  }>(res).data;
};

export const getDerivativeIndexes2 = async () => {
  // const res = await axiosClient.get(
  //   `https://athenaaws.tcbs.com.vn/athena/v1/indexSnaps?indexes=${INDEX_LIST.join(',')}`
  // );
  const res = await axios.get(`https://athenaaws.tcbs.com.vn/athena/v1/indexSnaps?indexes=${INDEX_LIST.join(',')}`, {
    headers: {
      'Access-Control-Allow-Origin': `${process.env.REACT_APP_HOST || '*'}`,
      Referer: `https://tcinvest.tcbs.com.vn`,
      Origin: `https://tcinvest.tcbs.com.vn`,
      origin: `https://tcinvest.tcbs.com.vn`,
      referer: `https://tcinvest.tcbs.com.vn`,
      'Referrer-Policy': 'unsafe-url',
    },
  });
  return new MyResponse<{
    data: Index[];
  }>(res).data;
};

export const getTotalIndex = async () => {
  const res = await axiosClient.get(`${baseUrl}/external/totalIndex`);
  return new MyResponse<TotalIndex>(res).data;
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

export const sendOpt = async (userName: string) => {
  const res = await axiosClient.get(`${baseUrl}/finance/withdraw/otp?username=${userName}`);
  return new MyResponse<any>(res);
};

export const drawMoney = async (data: DrawMoneyPayload) => {
  const res = await axiosClient.put(`${baseUrl}/finance/withdraw`, {
    ...data,
  });
  return new MyResponse<any>(res);
};
