import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import UserHeader from '../../components/user/layout/UserHeader';
import UserSideBar from '../../components/user/layout/UserSideBar';

const UserPage = () => {
  // const { pathname } = useLocation();

  return (
    <div className="grid grid-cols-12 w-full">
      <UserSideBar />
      <div className="bg-slate-50 col-span-10">
        <UserHeader />
        <div className="bg-gray-100 h-[calc(100vh-64px)]">
          <div></div>
          <div className=" flex h-full items-center py-6 flex-col">
            <div className="w-3/4 pb-2">
              {/* <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                  MUI
                </Link>
                <Link
                  underline="hover"
                  color="inherit"
                  href="/material-ui/getting-started/installation/"
                >
                  Core
                </Link>
                <Typography color="text.primary">Breadcrumbs</Typography>
              </Breadcrumbs> */}
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
