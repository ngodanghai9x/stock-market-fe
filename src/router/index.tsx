import { useRoutes } from 'react-router-dom';
import HomePage from '../pages/home';
import AuthPage from '../pages/auth';
import NotFoundPage from '../pages/not-found';
import RegisterPage from '../pages/register';
import UserRouter from './user-router';
import AdminRouter from './admin-router';
import UnauthorizedPage from '../pages/unauthorized';
import PriceTableDashboard from '../pages/user/PriceTableDashboard';
import CreateCompanyPublic from '../pages/admin/company/components/CreateCompanyPublic';

const Routers = () => {
  let element = useRoutes([
    { path: '/', element: <HomePage /> },

    // { path: "register", element: <RegisterPage /> },
    // just temporary
    { path: 'forgot-password', element: <AuthPage /> },
    { path: 'register', element: <AuthPage /> },
    { path: 'login', element: <AuthPage /> },
    { path: 'logout', element: <AuthPage /> },

    { path: 'create-company', element: <CreateCompanyPublic /> },

    { path: 'price-table/*', element: <PriceTableDashboard /> },
    { path: 'user/*', element: <UserRouter /> },
    { path: 'admin/*', element: <AdminRouter /> },
    { path: 'unauthorized', element: <UnauthorizedPage /> },
    { path: '*', element: <NotFoundPage /> },
  ]);
  return element;
};

export default Routers;
