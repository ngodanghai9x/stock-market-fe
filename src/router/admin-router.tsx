import { Route, Routes } from 'react-router-dom'
import AuthorizationRoute from '../components/auth/components/authorization-route'
import { PATH_NAMES } from '../constants/path-name'
import AdminPage from '../pages/admin'
import CompanyPage from '../pages/admin/company'
import DashboardPage from '../pages/admin/dashboard'
import IndustryPage from '../pages/admin/industry'
import UserPage from '../pages/admin/user'

const AdminRouter = () => {
  return (
    <AuthorizationRoute>
      <Routes>
        <Route path='/' element={<AdminPage />}>
          <Route path={PATH_NAMES.companies} element={<CompanyPage />} />
          <Route path={PATH_NAMES.industries} element={<IndustryPage />} />
          <Route path={PATH_NAMES.users} element={<UserPage />} />
          <Route path={PATH_NAMES.dashboard} element={<DashboardPage />} />
        </Route>
      </Routes>
    </AuthorizationRoute>
  )
}

export default AdminRouter