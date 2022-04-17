import React from 'react';
import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom';
import { PATH_NAMES } from '../../../constants/path-name';
// import { USER_SIDEBAR } from '../../../constants/path-name';
import IdentificationSvg from '../../../pages/user/Icon/IdentificationSvg';
import PaymentSvg from '../../../pages/user/Icon/PaymentSvg';
import SecuritySvg from '../../../pages/user/Icon/SecuritySvg';
import UserSvg from '../../../pages/user/Icon/UserSvg';
import CustomLink from '../../CustomLink';
import LetterAvatar from '../../LetterAvatar';

export const USER_SIDEBAR: Record<string, { label: string; render: () => React.ReactNode }> = {
  [PATH_NAMES.userInfo.slice(1)]: { label: 'Thông tin cơ bản', render: () => <UserSvg /> },
  [PATH_NAMES.security.slice(1)]: { label: 'Bảo mật', render: () => <SecuritySvg /> },
  [PATH_NAMES.identification.slice(1)]: { label: 'Căn cước công dân', render: () => <IdentificationSvg /> },
  [PATH_NAMES.payment.slice(1)]: { label: 'Thanh toán', render: () => <PaymentSvg /> },
};

const UserSideBar = () => {
  return (
    <div className="col-span-2 h-screen border-r">
      <div className="py-3 text-white font-bold text-2xl border-b">
        <div className="opacity-0 ">
          <LetterAvatar name={'H a i'} />
        </div>
      </div>
      <div>
        <ul className="flex flex-col">
          {Object.keys(USER_SIDEBAR).map((option, index) => (
            <li key={`UserSideBar${option}`} className="text-base  hover:bg-gray-100">
              <CustomLink to={option}>
                <span style={{ transform: 'scale(0.8)' }}>{USER_SIDEBAR[option].render()}</span>
                <span className="ml-3">{USER_SIDEBAR[option].label}</span>
              </CustomLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserSideBar;
