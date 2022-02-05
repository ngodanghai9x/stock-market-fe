import React from 'react';
import { useRoutes, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/auth/components/protected-route';
import ChangePassword from '../pages/user/change-password';

const PrivateRouter = () => {
  return <ProtectedRoute>
    <Routes>
      <Route path="change-password" element={<ChangePassword />} />
    </Routes>
  </ProtectedRoute>
};

export default PrivateRouter;
