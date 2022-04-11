export const PATH_NAMES = {
  login: '/login',
  register: '/register',
  home: '/',
  unauthorized: '/unauthorized',
  companies: '/companies',
  industries: '/industries',
  users: '/users',
  dashboard: '/dashboard',
  companyDetail: '/companies/:companyId',
};

export const PUBLIC_ROUTES = [PATH_NAMES.login, PATH_NAMES.register];

export const SIDEBAR_OPTION = ['companies', 'industries', 'users', 'dashboard'];
