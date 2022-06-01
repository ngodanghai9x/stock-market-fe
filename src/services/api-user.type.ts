import { Gender } from '../constants';
import { StockOrder, StockOrderMatching, MarketHistory, User, CitizenIdentity, UserStorage } from './api-admin.type';

export type SymbolTradePurchase = {
  [price: string]: Partial<StockOrder>[];
};

export type Purchase = 'buy' | 'sell';

export type GroupedStockOrders = {
  [symbol: string]: { [purchase: Purchase | string]: { [price: string]: StockOrder[] } };
  // [symbol: string]: Record<Purchase, { [price: string]: StockOrder[] }>;
};

export type MatchingGroupedStockOrders = {
  [symbol: string]: { matchingOrders: StockOrderMatching[] };
};

export type GroupedHistory = {
  [symbol: string]: MarketHistory;
};

export type GroupedStorage = {
  [symbol: string]: UserStorage;
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

export type CreateStockOrder = {
  orderId?: number;
  orderTypeId: number;
  stockSymbol: string;
  userId: number;
  quantity: number;
  price: number;
  isBuy: boolean;
  currentQuantity?: number;
  currentPrice?: number;
  statusId?: number;
};

export type CreateStockOrderPayload = {
  order: CreateStockOrder;
  otpTrading: string;
};

export type CreateDepositPayload = {
  bankNumber: string;
  bankName: string;
  money: number;
  message: string;
}

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

export type GetUser = { user: User; citizenIdentity: CitizenIdentity | null; storage: GroupedStorage };

export type EditableUser = {
  fullName: string;
  email: string;
  phone: string;
  birthday: string | Date;
} & User;

export type EditableIdentity = {
  number: string;
  name: string;
  gender: Gender;
  birthday: string | Date;
  originAddress: string;
  residenceAddress: string;
  createDate: string;
  createBy: string;
} & CitizenIdentity;

export type EditUserPayload = {
  user?: EditableUser;
  citizenIdentity?: EditableIdentity;
  password: string;
};

export type DrawMoneyPayload = {
  receiveBank: string;
  receiveBankNum: string;
  bankNumber: string;
  money: number;
  oldPassword: string;
  otp: string;
};

export type Index = {
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
};

export type TotalIndex = { totalMatch: number; totalValue: number }
