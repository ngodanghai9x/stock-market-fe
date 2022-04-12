import { Gender } from '../constants';
import { StockOrder } from './api-admin.type';

export type SymbolTradePurchase = {
  [price: string]: Partial<StockOrder>[];
};

export type Purchase = 'buy' | 'sell';

export type GroupedStockOrders = {
  [symbol: string]: { [purchase: string | Purchase]: { [price: string]: Partial<StockOrder>[] } };
  // [symbol: string]: Record<Purchase, { [price: string]: StockOrder[] }>;
};

export type GetAllStockOrderResponse = {
  grouped: GroupedStockOrders;
  total: number;
  orders: StockOrder[];
};

export type EditableUser = {
  fullName: string;
  email: string;
  phone: string;
  birthday: string | Date;
};

export type EditableIdentity = {
  number: string;
  name: string;
  gender: Gender;
  birthday: string | Date;
  originAddress: string;
  residenceAddress: string;
  createDate: string;
  createBy: string;
};

export type EditUserPayload = {
  user: EditableUser;
  citizenIdentity: EditableIdentity;
};
