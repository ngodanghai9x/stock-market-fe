import { Gender } from '../constants';
import { StockOrder, StockOrderMatching, MarketHistory, User, CitizenIdentity } from './api-admin.type';

export type SymbolTradePurchase = {
  [price: string]: Partial<StockOrder>[];
};

export type Purchase = 'buy' | 'sell';

export type GroupedStockOrders = {
  [symbol: string]: { [purchase: Purchase | string]: { [price: string]: Partial<StockOrder>[] } };
  // [symbol: string]: Record<Purchase, { [price: string]: StockOrder[] }>;
};

export type MatchingGroupedStockOrders = {
  [symbol: string]: { matchingOrders: StockOrderMatching[] };
};

export type GroupedHistory = {
  [symbol: string]: MarketHistory;
};

export type PriceOrders = {
  price: number;
  amount: number;
  orders?: StockOrder[];
};

export type PriceItem = {
  symbol: string;
  ceilPrice: number;
  refPrice: number;
  floorPrice: number;
  bestBuy: PriceOrders;
  secondBuy: PriceOrders;
  thirdBuy: PriceOrders;
  bestSell: PriceOrders;
  secondSell: PriceOrders;
  thirdSell: PriceOrders;
  matchingPrice: number;
  matchingAmount: number;
  matchingChange: number;
  matchingOrders?: StockOrderMatching[];
  matchedHigh: number;
  matchedLow: number;
  matchedAvg: number;
  matchedTotal: number;
};

export type GetAllStockOrderResponse = {
  grouped: GroupedStockOrders;
  history: GroupedHistory;
  matchingGrouped: MatchingGroupedStockOrders;
  total: number;
  // orders: StockOrder[];
};

export type GetUserOrdersResponse = {
  total: number;
  orders: StockOrder[];
};

export type GetUser = { user: User; citizenIdentity: CitizenIdentity | null };

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
