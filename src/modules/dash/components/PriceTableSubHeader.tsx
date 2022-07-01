import React from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Avatar, Tooltip } from '@mui/material';
import CustomLink from '../../../components/CustomLink';
import { USER_SIDEBAR } from '../../../components/user/layout/UserSideBar';
import { DerivativeIndex, RoleIdType } from '../../../constants';
import { PATH_NAMES } from '../../../constants/path-name';
import Logout from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { AuthContext } from '../../../context/auth/AuthContext';
import LetterAvatar from '../../../components/LetterAvatar';
import { Login } from '@mui/icons-material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Index, TotalIndex } from '../../../services/api-user.type';
import { formatTotal, numberWithCommas, stringAvatar } from '../../../lib/utils';

const data = [
  {
    indexNumber: 1,
    index: 1195.32,
    change: -2.28,
    changePercent: -0.19,
    volume: 504382508,
    value: 10666351000000,
    increase: 168,
    decrease: 282,
    notChange: 62,
    session: 'A',
    ceilIncrease: 15,
    floorDecrease: 6,
    preIndex: 1197.599976,
  },
  {
    indexNumber: 2,
    index: 1246.05,
    change: -2.87,
    changePercent: -0.23,
    volume: 122151500,
    value: 3878484000000,
    increase: 11,
    decrease: 16,
    notChange: 3,
    session: 'A',
    preIndex: 1248.920044,
  },
  {
    indexNumber: 3,
    index: 278.54,
    change: 0.85,
    changePercent: 0.31,
    volume: 75055442,
    value: 1299811546800,
    increase: 69,
    decrease: 114,
    notChange: 41,
    session: '30',
    ceilIncrease: 6,
    floorDecrease: 12,
    preIndex: 277.679993,
  },
  {
    indexNumber: 5,
    index: 87.7,
    change: -0.88,
    changePercent: -0.99,
    volume: 66073352,
    value: 905586591000,
    increase: 103,
    decrease: 220,
    notChange: 83,
    session: '5',
    ceilIncrease: 18,
    floorDecrease: 49,
    preIndex: 88.580002,
  },
];

const PriceTableSubHeader = ({ indexes, totalIndex }: { indexes: Index[]; totalIndex: TotalIndex }) => {
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
    <div className="bg-trueGray-800 text-white flex items-center px-4 py-1">
      <div className="text-myYellow flex items-center">
        <img className="scale-75" src={process.env.PUBLIC_URL + '/favicon.ico'} alt="" />
        <div className="font-medium mx-1">Stock Market</div>
      </div>
      <div className="flex px-4 py-2 justify-center flex-1">
        <span>KL (cp): {formatTotal(totalIndex.totalMatch || 645422302)}</span>
        <span className="block mx-6">GT: {formatTotal(totalIndex.totalValue || 12869925897800)}</span>
        {(indexes.length ? indexes : data).map((o) => {
          return (
            <div className="flex items-center mr-6" key={o.indexNumber + 'DerivativeIndex'}>
              <span>{DerivativeIndex[o.indexNumber]}:</span>
              <div className={`${o.change >= 0 ? 'text-myGreen' : 'text-myRed'} flex`}>
                <span className="block mx-2">{numberWithCommas(o.index)}</span>
                <span className="flex items-center">
                  {o.change >= 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />} <span>{o.change}</span>
                  <span className="text-sm">({o.changePercent}%)</span>
                </span>
              </div>
            </div>
          );
        })}
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
          <Avatar {...stringAvatar(user.fullName, { width: '26px', height: '26px', p: 1, fontSize: '14px' })} />
        </Tooltip>
      </div>
    </div>
  );
};

export default PriceTableSubHeader;
