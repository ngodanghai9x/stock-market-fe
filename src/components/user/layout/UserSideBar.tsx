import React from 'react';
import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom';
import { PATH_NAMES } from '../../../constants/path-name';
// import { USER_SIDEBAR } from '../../../constants/path-name';
import IdentificationSvg from '../../../pages/user/Icon/IdentificationSvg';
import PaymentSvg from '../../../pages/user/Icon/PaymentSvg';
import SecuritySvg from '../../../pages/user/Icon/SecuritySvg';
import UserSvg from '../../../pages/user/Icon/UserSvg';

export const USER_SIDEBAR: Record<string, { label: string; render: () => React.ReactNode }> = {
  [PATH_NAMES.userInfo.slice(1)]: { label: 'Thông tin cơ bản', render: () => <UserSvg /> },
  [PATH_NAMES.security.slice(1)]: { label: 'Bảo mật', render: () => <SecuritySvg /> },
  [PATH_NAMES.identification.slice(1)]: { label: 'Căn cước công dân', render: () => <IdentificationSvg /> },
  [PATH_NAMES.payment.slice(1)]: { label: 'Thanh toán', render: () => <PaymentSvg /> },
};

const UserSideBar = () => {
  return (
    <div className="col-span-2 h-screen border-r">
      <div className="p-4 text-white font-bold text-2xl border-b">
        <p>Thu gon</p>
      </div>
      <div>
        <ul className="flex flex-col">
          {Object.keys(USER_SIDEBAR).map((option, index) => (
            <li key={index} className="text-base  hover:bg-gray-100">
              <div className="flex items-center justify-center">
                {USER_SIDEBAR[option].render()}
                <CustomLink to={option}>{USER_SIDEBAR[option].label}</CustomLink>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

function CustomLink({ children, to, ...props }: LinkProps) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link to={to} {...props} className={`block w-full h-full py-3  px-4 ${match ? 'font-bold' : ''}`}>
        {children}
      </Link>
    </div>
  );
}

export default UserSideBar;
