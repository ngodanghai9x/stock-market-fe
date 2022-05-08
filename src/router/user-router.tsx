import React from 'react';
import { useRoutes, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/auth/components/protected-route';
import UserDashboard from '../pages/user/UserDashboard';
import Identification from '../pages/user/Identification';
import Security from '../pages/user/Security';
import Payment from '../pages/user/Payment';
import { PATH_NAMES } from '../constants/path-name';
import UserPage from '../pages/user';
import ChangePassword from '../pages/user/ChangePassword';

const UserRouter = () => {
  return (
    <ProtectedRoute>
      <Routes>
        <Route path="/" element={<UserPage />}>
          {/* <Route path={PATH_NAMES.priceTable} element={<PriceTableDashboard />} /> */}
          <Route path={PATH_NAMES.userInfo} element={<UserDashboard />} />
          <Route path={PATH_NAMES.security} element={<Security />} />
          <Route path={PATH_NAMES.changePassword} element={<ChangePassword />} />
          <Route path={PATH_NAMES.identification} element={<Identification />} />
          <Route path={PATH_NAMES.payment} element={<Payment />} />
        </Route>
      </Routes>
    </ProtectedRoute>
  );
};

export default UserRouter;
