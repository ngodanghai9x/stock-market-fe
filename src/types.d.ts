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

export type SymbolTradePurchase = {
  [price: string]: Partial<StockOrder>[];
};

export type Purchase = 'buy' | 'sell';

//  Record<string, Record<string, any>>;
export type GroupedStockOrders = {
  [symbol: string]: { [purchase: string | Purchase]: { [price: string]: Partial<StockOrder>[] } };
  // [symbol: string]: Record<Purchase, { [price: string]: StockOrder[] }>;
};

