import React from 'react';
import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom';
// import { SIDEBAR_OPTION } from '../../../constants/path-name';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ConstructionIcon from '@mui/icons-material/Construction';
import PersonIcon from '@mui/icons-material/Person';
import { PATH_NAMES } from '../../../constants/path-name';

export const ADMIN_SIDEBAR: Record<string, { label: string; render: () => React.ReactNode }> = {
  [PATH_NAMES.dashboard.slice(1)]: { label: 'Trang chủ', render: () => <DashboardIcon /> },
  [PATH_NAMES.companies.slice(1)]: { label: 'Công ty', render: () => <LocationCityIcon /> },
  [PATH_NAMES.industries.slice(1)]: { label: 'Ngành nghề', render: () => <ConstructionIcon /> },
  [PATH_NAMES.users.slice(1)]: { label: 'Người dùng', render: () => <PersonIcon /> },
};

const SideBar = () => {
  return (
    <div className="col-span-2 h-screen border-r">
      <div className="p-4 text-white font-bold text-2xl border-b">
        <p>Thu gon</p>
      </div>
      <div>
        <ul className="flex flex-col">
          {Object.keys(ADMIN_SIDEBAR).map((option, index) => (
            <li key={index} className="text-base  hover:bg-gray-100">
              <div className="flex items-center justify-center">
                {ADMIN_SIDEBAR[option].render()}
                <CustomLink to={option}>{ADMIN_SIDEBAR[option].label}</CustomLink>
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

export default SideBar;
