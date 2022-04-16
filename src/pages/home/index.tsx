import { useContext, useEffect } from 'react';
import ProtectedRoute from '../../components/auth/components/protected-route';
import { AuthContext } from '../../context/auth/AuthContext';
import { getAllOrder, getUserById } from '../../services/api-user.service';

const HomePage = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllOrder();
      const res2 = await getUserById(1);
      console.log('🚀 ~ file: index.tsx ~ line 12 ~ fetchData ~ list', {
        res,
        res2
      });
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
