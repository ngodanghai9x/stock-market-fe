import React from 'react';
import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom';
// import { SIDEBAR_OPTION } from '../../../constants/path-name';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ConstructionIcon from '@mui/icons-material/Construction';
import PersonIcon from '@mui/icons-material/Person';
import { PATH_NAMES } from '../../../constants/path-name';
import LetterAvatar from '../../LetterAvatar';
import CustomLink from '../../CustomLink';

export const ADMIN_SIDEBAR: Record<string, { label: string; render: () => React.ReactNode }> = {
  [PATH_NAMES.dashboard.slice(1)]: { label: 'Trang chủ', render: () => <DashboardIcon /> },
  [PATH_NAMES.companies.slice(1)]: { label: 'Công ty', render: () => <LocationCityIcon /> },
  [PATH_NAMES.industries.slice(1)]: { label: 'Ngành nghề', render: () => <ConstructionIcon /> },
  [PATH_NAMES.users.slice(1)]: { label: 'Người dùng', render: () => <PersonIcon /> },
};

const SideBar = () => {
  return (
    <div className="col-span-2 h-screen border-r">
      <div className="py-3 text-white font-bold text-2xl border-b">
        <div className="opacity-0 ">
          <LetterAvatar name={'H a i'} />
        </div>
      </div>
      <div>
        <ul className="flex flex-col">
          {Object.keys(ADMIN_SIDEBAR).map((option) => (
            <li key={`SideBar${option}`} className="text-base  hover:bg-gray-100">
              {/* <div className="flex items-center justify-center"> */}
              <CustomLink to={option}>
                {ADMIN_SIDEBAR[option].render()}
                <span className="ml-3">{ADMIN_SIDEBAR[option].label}</span>
              </CustomLink>
              {/* </div> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
