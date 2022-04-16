import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { USER_SIDEBAR } from './UserSideBar';

const UserHeader = () => {
  const [currentPage, setCurrentPage] = useState<string>('');
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
      <div className="p-4">
        <h1 className="text-white font-bold text-2xl">{USER_SIDEBAR[currentPage]?.label}</h1>
      </div>
    </div>
  );
};

export default UserHeader;
