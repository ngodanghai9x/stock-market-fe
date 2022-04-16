import React from 'react';
import { useRoutes, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/auth/components/protected-route';
import ChangeAntiPhishingCode from '../pages/user/ChangeAntiPhishingCode';
import ChangePassword from '../pages/user/ChangePassword';
import UserDashboard from '../pages/user/UserDashboard';
import Identification from '../pages/user/Identification';
import Security from '../pages/user/Security';
import PriceTableDashboard from '../pages/user/PriceTableDashboard';
import Payment from '../pages/user/Payment';
import { PATH_NAMES } from '../constants/path-name';
import UserPage from '../pages/user';

const UserRouter = () => {
  return (
    <ProtectedRoute>
      <Routes>
        <Route path="/" element={<UserPage />}>
          <Route path={PATH_NAMES.priceTable} element={<PriceTableDashboard />} />
          <Route path={PATH_NAMES.userInfo} element={<UserDashboard />} />
          <Route path={PATH_NAMES.security} element={<Security />} />
          <Route path={PATH_NAMES.identification} element={<Identification />} />
          <Route path={PATH_NAMES.payment} element={<Payment />} />
          {/* <Route path={PATH_NAMES.changePassword} element={<ChangePassword />} />
          <Route path={PATH_NAMES.changeAntiPhishingCode} element={<ChangeAntiPhishingCode />} /> */}
        </Route>
      </Routes>
    </ProtectedRoute>
  );
};

export default UserRouter;
