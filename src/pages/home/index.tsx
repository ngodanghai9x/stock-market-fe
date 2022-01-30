import { useContext } from 'react';
import ProtectedRoute from '../../components/auth/components/protected-route';
import { AuthContext } from '../../context/auth/auth';

const HomePage = () => {
  const { user } = useContext(AuthContext)
  console.log(user)
  return (
    <ProtectedRoute>
      <div>
        Day la home page 1 {user.username}
      </div>
    </ProtectedRoute>
  )
};

export default HomePage;
