export const PATH_NAMES = {
  // public
  login: '/stock-market-fe/login',
  logout: '/stock-market-fe/logout',
  register: '/stock-market-fe/register',
  forgotPassword: '/stock-market-fe/forgot-password',

  home: '/stock-market-fe/',
  unauthorized: '/stock-market-fe/unauthorized',

  // admin
  admin: '/stock-market-fe/admin/dashboard',
  dashboard: '/stock-market-fe/dashboard',
  companies: '/stock-market-fe/companies',
  industries: '/stock-market-fe/industries',
  users: '/stock-market-fe/users',
  companyDetail: '/stock-market-fe/companies/:companyId',
  industryDetail: '/stock-market-fe/industries/:industryId',
  userDetail: '/stock-market-fe/users/:userId',

  // user
  user: '/stock-market-fe/user',
  priceTable: '/stock-market-fe/price-table',
  userInfo: '/stock-market-fe/info',
  security: '/stock-market-fe/security',
  identification: '/stock-market-fe/identification',
  payment: '/stock-market-fe/payment',
  changePassword: '/stock-market-fe/change-password',
};

export const NEED_REDIRECT_ROUTES = [PATH_NAMES.login, PATH_NAMES.register, PATH_NAMES.home];

export const SIDEBAR_OPTION: Record<string, string> = {
  dashboard: 'Trang chủ',
  companies: 'Công ty',
  industries: 'Ngành nghề',
  users: 'Người dùng',
};
