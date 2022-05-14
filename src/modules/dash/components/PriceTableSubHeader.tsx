import React from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Avatar, Tooltip } from '@mui/material';
import CustomLink from '../../../components/CustomLink';
import { USER_SIDEBAR } from '../../../components/user/layout/UserSideBar';
import { RoleIdType } from '../../../constants';
import { PATH_NAMES } from '../../../constants/path-name';
import Logout from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { AuthContext } from '../../../context/auth/AuthContext';
import LetterAvatar from '../../../components/LetterAvatar';
import { Login } from '@mui/icons-material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const PriceTableSubHeader = () => {
  const { user } = React.useContext(AuthContext);

  const USER_MENU = React.useMemo(() => {
    const toReturn = {
      [PATH_NAMES.admin.slice(1)]: { label: 'Trang quản lý', render: () => <ManageAccountsIcon />, exact: true },
      ...USER_SIDEBAR,
      [PATH_NAMES.logout.slice(1)]: { label: 'Đăng xuất', render: () => <Logout fontSize="small" />, exact: true },
      [PATH_NAMES.login.slice(1)]: { label: 'Đăng nhập', render: () => <Login fontSize="small" />, exact: true },
    };

    if ([RoleIdType.admin, RoleIdType.moderator].includes(user.roleId)) {
      delete toReturn[PATH_NAMES.payment.slice(1)];
    } else {
      delete toReturn[PATH_NAMES.admin.slice(1)];
    }
    if (!user?.userId) {
      delete toReturn[PATH_NAMES.logout.slice(1)];
    } else {
      delete toReturn[PATH_NAMES.login.slice(1)];
    }
    return toReturn;
  }, [user.roleId, user?.userId]);

  return (
    <div className=" bg-trueGray-800 text-white flex items-center pr-4">
      <div className="text-myYellow flex items-center">
        <img src={process.env.PUBLIC_URL + '/favicon.ico'} alt="" />
        <div>Stock Market App</div>
      </div>
      <div className="flex px-4 py-2 justify-center flex-1">
        <span>KL (cp): 764tr</span>
        <span className="block mx-6">GT: 764,989 tỷ</span>
        <div className="flex items-center mr-6">
          <span>VNI:</span>
          <div className="text-myGreen flex">
            <span className="block mx-2">12345</span>
            <span className="block flex items-center ml-1">
              <ArrowUpwardIcon /> <span>15.90%</span>
            </span>
          </div>
        </div>
        <div className="flex items-center mr-6">
          <span>VN30:</span>
          <div className="text-myGreen flex">
            <span className="block mx-2">12345</span>
            <span className="block flex items-center ml-1">
              <ArrowUpwardIcon /> <span>15.90%</span>
            </span>
          </div>
        </div>
        <div className="flex items-center mr-6">
          <span>HNX:</span>
          <div className="text-myGreen flex">
            <span className="block mx-2">12345</span>
            <span className="block flex items-center ml-1">
              <ArrowUpwardIcon /> <span>15.90%</span>
            </span>
          </div>
        </div>
        <div className="flex items-center mr-6">
          <span>UPCOM:</span>
          <div className="text-myGreen flex">
            <span className="block mx-2">12345</span>
            <span className="block flex items-center ml-1">
              <ArrowUpwardIcon /> <span>15.90%</span>
            </span>
          </div>
        </div>
      </div>
      <div>
        <Tooltip
          title={
            <ul className="flex flex-col">
              {Object.keys(USER_MENU).map((option, index) => (
                <li key={`UserSideBar${option}`} className="text-base  hover:bg-gray-100 hover:text-black">
                  <CustomLink to={USER_MENU[option].exact ? `/${option}` : `/user/${option}`}>
                    <span className="mr-3">{USER_MENU[option].render()}</span>
                    <span className="">{USER_MENU[option].label}</span>
                  </CustomLink>
                </li>
              ))}
            </ul>
          }
          arrow
        >
          {/* <LetterAvatar noWrap sx={{ width: '26px', height: '26px', p: 1, fontSize: '14px' }} /> */}
          <Avatar
            alt={user.fullName}
            src="/static/images/avatar/1.jpg"
            sx={{ width: '26px', height: '26px', p: 1, fontSize: '14px' }}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default PriceTableSubHeader;
