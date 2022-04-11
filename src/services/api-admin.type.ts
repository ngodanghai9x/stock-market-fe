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
  birthday: string | null;
  money: number;
  antiPhishingCode: string;
  userStatus: string;
  createdAt: string | null;
};

export type CreateCompanyPayload = {
  isIpo: boolean;
  needChangePw: boolean;
  account: {
    username: string;
  };
  company: {
    companyName: string;
    industryId: number;
    websiteUrl: string | null;
    contactEmail: string;
    phoneNumber: string | null;
    numEmployees: string | null;
    foundedDate: Date;
    ipoDate: Date;
  };
  stock: {
    stockSymbol: string;
    quantity: number;
    price: number;
  };
};

export type CreateIndustryPayload = {
  industry: Partial<Industry>;
};

export type EditUserPayload = {
  user: Partial<User>;
};
