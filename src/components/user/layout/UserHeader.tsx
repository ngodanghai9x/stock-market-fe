import { Login, Logout } from '@mui/icons-material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { PATH_NAMES } from '../../../constants/path-name';
import { AuthContext } from '../../../context/auth/AuthContext';
import AccountMenu from '../../AccountMenu';
import { USER_SIDEBAR } from './UserSideBar';

const USER_SIDEBAR_LOCAL = {
  [PATH_NAMES.admin.slice(1)]: { label: 'Trang quản lý', render: () => <ManageAccountsIcon />, exact: true },
  ...USER_SIDEBAR,
  [PATH_NAMES.logout.slice(1)]: { label: 'Đăng xuất', render: () => <Logout fontSize="small" />, exact: true },
  [PATH_NAMES.login.slice(1)]: { label: 'Đăng nhập', render: () => <Login fontSize="small" />, exact: true },
};

const UserHeader = () => {
  const [currentPage, setCurrentPage] = useState<string>('');
  const { user } = React.useContext(AuthContext);
  const { pathname } = useLocation();
  const params = useParams();

  useEffect(() => {
    if (Object.keys(params).length > 1) return;
    const path = pathname.split('/');
    if (path.length < 0) return;
    setCurrentPage(path[path.length - 1]);
  }, [params, pathname]);

  return (
    <div className="bg-lightBlue-500 col-span-10 shadow-xl">
      <div className="py-3 px-5 flex justify-between text-justify">
        <h1 className="text-white font-bold text-2xl pt-1">{USER_SIDEBAR_LOCAL[currentPage]?.label}</h1>
        <AccountMenu />
      </div>
    </div>
  );
};

export default UserHeader;
