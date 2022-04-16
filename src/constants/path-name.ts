export const PATH_NAMES = {
  // public
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',

  home: '/',
  unauthorized: '/unauthorized',

  // admin
  dashboard: '/dashboard',
  companies: '/companies',
  industries: '/industries',
  users: '/users',
  companyDetail: '/companies/:companyId',
  industryDetail: '/industries/:industryId',
  userDetail: '/users/:userId',

  // user
  priceTable: '/price-table',
  userInfo: '/info',
  security: '/security',
  identification: '/identification',
  payment: '/payment',
  changePassword: '/security/change-password',
  changeAntiPhishingCode: '/security/change-anti-phishing-code'
};

export const PUBLIC_ROUTES = [PATH_NAMES.login, PATH_NAMES.register];

export const SIDEBAR_OPTION: Record<string, string> = {
  dashboard: 'Trang chủ',
  companies: 'Công ty',
  industries: 'Ngành nghề',
  users: 'Người dùng',
};
