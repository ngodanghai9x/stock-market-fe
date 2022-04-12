import { useContext, useEffect } from 'react';
import ProtectedRoute from '../../components/auth/components/protected-route';
import { AuthContext } from '../../context/auth/AuthContext';
import { getAllOrder } from '../../services/api-user.service';

const HomePage = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllOrder();
      console.log('🚀 ~ file: index.tsx ~ line 12 ~ fetchData ~ list', res);
    };
    fetchData();
  }, []);

  return (
    <ProtectedRoute>
      <div>Day la home page 1 {user.username}</div>
    </ProtectedRoute>
  );
};

export default HomePage;
