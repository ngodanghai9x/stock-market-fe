export const PATH_NAMES = {
  // public
  login: '/login',
  logout: '/logout',
  register: '/register',
  forgotPassword: '/forgot-password',

  home: '/',
  unauthorized: '/unauthorized',

  // admin
  admin: '/admin/dashboard',
  dashboard: '/dashboard',
  companies: '/companies',
  industries: '/industries',
  users: '/users',
  companyDetail: '/companies/:companyId',
  industryDetail: '/industries/:industryId',
  userDetail: '/users/:userId',

  // user
  user: '/user',
  priceTable: '/price-table',
  userInfo: '/info',
  security: '/security',
  identification: '/identification',
  payment: '/payment',
  changePassword: '/change-password',
};

export const NEED_REDIRECT_ROUTES = [PATH_NAMES.login, PATH_NAMES.register, PATH_NAMES.home];

export const SIDEBAR_OPTION: Record<string, string> = {
  dashboard: 'Trang chủ',
  companies: 'Công ty',
  industries: 'Ngành nghề',
  users: 'Người dùng',
};
