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
    index: 1198.94,
    change: 16.17,
    changePercent: 1.37,
    volume: 263554000,
    value: 6318229000000,
    increase: 313,
    decrease: 119,
    notChange: 42,
    session: 'O',
    ceilIncrease: 9,
    floorDecrease: 4,
    preIndex: 1182.77002,
  },
  {
    indexNumber: 2,
    index: 1244.85,
    change: 21.09,
    changePercent: 1.72,
    volume: 74173600,
    value: 2425979000000,
    increase: 23,
    decrease: 7,
    session: 'O',
  },
  {
    indexNumber: 3,
    index: 311.38,
    change: 8.99,
    changePercent: 2.97,
    volume: 38773195,
    value: 770814780500,
    increase: 156,
    decrease: 39,
    notChange: 34,
    session: '5',
    ceilIncrease: 15,
    floorDecrease: 6,
    preIndex: 302.390015,
  },
  {
    indexNumber: 4,
    index: 530.76,
    change: 23.79,
    changePercent: 4.69,
    volume: 25096100,
    value: 585924510000,
    increase: 27,
    decrease: 3,
    session: '5',
    ceilIncrease: 3,
    preIndex: 506.980011,
  },
  {
    indexNumber: 5,
    index: 94.6,
    change: 0.99,
    changePercent: 1.06,
    volume: 16561520,
    value: 285641420000,
    increase: 186,
    decrease: 60,
    notChange: 41,
    session: '5',
    ceilIncrease: 13,
    floorDecrease: 8,
    preIndex: 93.610001,
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
        <span>KL (cp): {formatTotal(totalIndex.totalMatch || 764000000)}</span>
        <span className="block mx-6">GT: {formatTotal(totalIndex.totalValue || 9890000000)}</span>
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
          <Avatar
            alt={user.fullName}
            src="/static/images/avatar/1.jpg"
            {...stringAvatar(user.fullName, { width: '26px', height: '26px', p: 1, fontSize: '14px' })}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default PriceTableSubHeader;
