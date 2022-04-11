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
