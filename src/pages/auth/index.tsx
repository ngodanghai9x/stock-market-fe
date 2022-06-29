import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import LoginLogo from '../../components/images/LoginLogo';
import { PATH_NAMES } from '../../constants/path-name';
import { ForgotPasswordForm, LoginForm, RegisterForm, LogoutForm } from '../../modules/auth';
import PriceTableDashboard from '../user/PriceTableDashboard';

const Menu: Record<string, string> = {
  [PATH_NAMES.register]: 'Đăng ký',
  [PATH_NAMES.login]: 'Đăng nhập',
  [PATH_NAMES.forgotPassword]: 'Quên mật khảu',
};

// const AuthPage = () => {
//   return (
//     <div>
//       <PriceTableDashboard />
//     </div>
//   )
// }

const AuthPage = () => {
  // const params = useParams();
  const { pathname } = useLocation();
  const navigation = useNavigate();

  // useEffect(() => {
  //   if (Object.keys(params).length > 1) return;
  //   const path = pathname.split('/');
  //   if (path.length < 0) return;
  // }, [params, pathname]);

  const renderForm = () => {
    switch (pathname) {
      case PATH_NAMES.login: {
        return <LoginForm />;
      }
      case PATH_NAMES.logout: {
        return <LogoutForm />;
      }
      case PATH_NAMES.register: {
        return <RegisterForm />;
      }
      case PATH_NAMES.forgotPassword: {
        return <ForgotPasswordForm />;
      }

      default: {
        return <LoginForm />;
      }
    }
  };

  return (
    <div className="container mx-auto max-w-none flex items-center justify-center h-screen bg-gray-100">
      <div className="h-2/3 w-4/5 grid grid-cols-7 max-w-screen-lg">
        <div className="w-full bg-blue-purple col-span-3 rounded-2xl shadow-2xl text-white py-10">
          <div className="w-44 h-44 mx-auto border-dashed border-2 border-white rounded-full p-3 flex items-center justify-center bg-blue-purple-dark">
            <LoginLogo classNames="w-20" />
          </div>
        </div>
        <div className="col-span-4 bg-white my-5 rounded-tr-2xl rounded-br-2xl shadow-2xl px-10 py-8">
          <div className="flex mx-auto justify-center">
            <div className="flex font-bold text-base text-gray-300 mb-10 cursor-pointer">
              {Object.keys(Menu).map((path, idx) => {
                const activeForm = pathname === path;
                return (
                  <span
                    key={path + idx}
                    className={`px-3 mx-1 border-b-2 ${
                      activeForm
                        ? 'border-b-2 border-lightBlue-300 text-lightBlue-300 font-extrabold'
                        : 'border-gray-300 '
                    }`}
                    onClick={() => navigation(path)}
                  >
                    {Menu[path]}
                  </span>
                );
              })}
            </div>
          </div>
          {renderForm()}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
