export interface TokenInfo {
  userId: number;
  username: string;
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

export type LoginReq = {
  username: string;
  password: string;
};

export type LogoutReq = {};

export type RegisterReq = {
  username: string;
  password: string;
  fullName: string;
  email: string;
};

export type ForgetPwReq = {
  username: string;
  password: string;
  otpForget: string;
};

export type ChangPwReq = {
  password: string;
  oldPassword: string;
};

export type CreateCompanyReq = {
  company: Company;
  isIpo: boolean;
  account: { password: string; username: string };
  // stock: UserStorage;
};

export type ValidCreateCompanyReq = {
  company: Company;
  isIpo: boolean;
  user: User;
  // stock: UserStorage;
};
