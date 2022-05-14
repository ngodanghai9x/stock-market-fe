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
import PaymentIcon from '@mui/icons-material/Payment';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import GppGoodIcon from '@mui/icons-material/GppGood';
import PersonIcon from '@mui/icons-material/Person';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { AuthContext } from '../../../context/auth/AuthContext';
import { RoleIdType } from '../../../constants';

export const USER_SIDEBAR: Record<string, { label: string; render: () => React.ReactNode; exact?: boolean }> = {
  [PATH_NAMES.userInfo.slice(1)]: { label: 'Thông tin cơ bản', render: () => <PersonIcon /> },
  [PATH_NAMES.security.slice(1)]: { label: 'Bảo mật', render: () => <GppGoodIcon /> },
  [PATH_NAMES.changePassword.slice(1)]: { label: 'Đổi mật khẩu', render: () => <VpnKeyIcon /> },
  [PATH_NAMES.identification.slice(1)]: { label: 'Xác minh', render: () => <BrandingWatermarkIcon /> },
  [PATH_NAMES.payment.slice(1)]: { label: 'Thanh toán', render: () => <PaymentIcon /> },
};

const UserSideBar = () => {
  const { user } = React.useContext(AuthContext);
  const USER_MENU = React.useMemo(() => {
    const toReturn = {
      ...USER_SIDEBAR,
    };

    if ([RoleIdType.admin, RoleIdType.moderator].includes(user.roleId)) {
      delete toReturn[PATH_NAMES.payment.slice(1)];
    }
    return toReturn;
  }, [user.roleId]);

  return (
    <div className="col-span-2 h-screen border-r">
      <div className="py-3 text-white font-bold text-2xl border-b">
        <div className="opacity-0 ">
          <LetterAvatar name={'H a i'} />
        </div>
      </div>
      <div>
        <ul className="flex flex-col">
          {Object.keys(USER_MENU).map((option, index) => (
            <li key={`UserSideBar${option}`} className="text-base  hover:bg-gray-100">
              <CustomLink to={option}>
                <span className="mr-3">{USER_MENU[option].render()}</span>
                <span className="">{USER_MENU[option].label}</span>
              </CustomLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserSideBar;
