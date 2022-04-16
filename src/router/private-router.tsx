import React from 'react';
import { useRoutes, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/auth/components/protected-route';
import ChangeAntiPhishingCode from '../pages/user/ChangeAntiPhishingCode';
import ChangePassword from '../pages/user/ChangePassword';
import UserDashboard from '../pages/user/UserDashboard';
import Identification from '../pages/user/Identification';
import Security from '../pages/user/Security';
import PriceTableDashboard from '../pages/user/PriceTableDashboard';

const PrivateRouter = () => {
  return <ProtectedRoute>
    <Routes>
      <Route path="price-table" element={<PriceTableDashboard />} />
      <Route path="dashboard" element={<UserDashboard />} />
      <Route path="security" element={<Security />} />
      <Route path="identification" element={<Identification />} />
      <Route path="security/change-password" element={<ChangePassword />} />
      <Route path="security/change-anti-phishing-code" element={<ChangeAntiPhishingCode />} />
    </Routes>
  </ProtectedRoute>
};

export default PrivateRouter;
