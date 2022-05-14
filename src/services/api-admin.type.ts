import { Gender, MatchedStatus } from '../constants';

export type MarketHistory = {
  id: number;
  date: string;
  stockSymbol: string;
  openPrice: number;
  closePrice: number;
  highPrice: number;
  lowPrice: number;
  totalQuantity: number;
  company?: Company;
};

export type UserStorage = {
  userId: number;
  stockSymbol: string;
  quantity: number;
  originQuantity: number;
  lockedQuantity: number;
  price: number;
  modifiedAt: string;
  user?: User;
};

export type StockOrder = {
  orderId: number;
  orderTypeId: number;
  stockSymbol: string;
  userId: number;
  quantity: number;
  price: number;
  currentQuantity?: number;
  currentPrice?: number;
  createdAt: string;
  isBuy: number;
  statusId: number;
  isDone: number;
  orderType?: any;
  user?: any;
  orderMatchings?: StockOrderMatching[];
};

export type StockOrderMatching = {
  id: number;
  orderId: number;
  status: MatchedStatus;
  quantity: number;
  price: number;
  fee: number;
  createdAt: string;
  order?: StockOrder;
};

export type Industry = {
  industryId: number;
  industryName: string;
  industryCode: string;
  description: string;
  editable: number;
  statusId: number;
};

export type User = {
  userId: number;
  username: string;
  // password: string | null;
  fullName: string;
  roleId: number;
  email: string | null;
  phone: string | null;
  birthday: string | null | Date;
  money: number;
  lockedMoney: number;
  antiPhishingCode: string;
  userStatus: string;
  createdAt: string | null;
};

export type Company = {
  companyId: number;
  companyName: string;
  stockSymbol: string;
  industryId: number;
  industry: Industry;
  websiteUrl: string | null;
  certificateUrl: string | null;
  contactEmail: string;
  phoneNumber: string | null;
  numEmployees: string | null;
  foundedDate: Date | string;
  ipoDate: Date | string;
  editable: number;
  statusId: number;
  userId: number;
};

export type CitizenIdentity = {
  id: number;
  number: string;
  name: string;
  birthday: string;
  gender: Gender;
  originAddress: string;
  residenceAddress: string;
  createDate: string;
  expiryDate: string;
  createBy: string;
  modifiedAt?: string;
  cardNumber: string;
  cardExpiryDate: string;
  userId: number;
  user?: User;
};

export type CreateCompanyPayload = {
  isIpo: boolean;
  needChangePw: boolean;
  account: {
    username: string;
    password?: string;
  };
  company: Omit<Company, 'userId'>;
  stock: {
    stockSymbol: string;
    quantity: number;
    price: number;
  };
};

export type EditCompanyPayload = {
  company: Omit<Company, 'companyId' | 'userId'>;
};

export type CreateIndustryPayload = {
  industry: Industry;
};

export type EditIndustryPayload = {
  industry: Partial<Industry>;
  // industry: Omit<Industry, 'industryId'>;
};

export type AdminEditUserPayload = {
  user: Pick<User, 'userStatus' | 'roleId'> & User;
};

export type SearchPayload = {
  q: string;
  page: number;
  size: number;
};

export type GetReportResponse = {
  company: {
    records: Partial<Company>[];
    count: number;
  };
  // industry: {
  //   records: Partial<Industry>[];
  //   count: number;
  // };
  user: {
    records: Partial<User>[];
    count: number;
  };
  stockOrder: {
    records: Partial<StockOrder>[];
    count: number;
  };
  matchedOrder: {
    records: Partial<StockOrderMatching>[];
    count: number;
  };
};
