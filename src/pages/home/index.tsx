import { useContext, useEffect } from 'react';
import ProtectedRoute from '../../components/auth/components/protected-route';
import { ActionTypes } from '../../constants';
import { AppContext, SocketContext } from '../../context';
import { AuthContext } from '../../context/auth/AuthContext';
import { getAllOrder, getUserById } from '../../services/api-user.service';

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const { store, dispatch } = useContext(AppContext);
  const { socket } = useContext(SocketContext);
  console.log('🚀HomePage ~ store', {
    store,
    dispatch,
    socket,
  });
  useEffect(() => {}, []);

  return (
    <ProtectedRoute>
      <>
        <div>Day la home page 1 {user.username}</div>
      </>
    </ProtectedRoute>
  );
};

export default HomePage;
