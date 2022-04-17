import { useContext, useEffect } from 'react';
import ProtectedRoute from '../../components/auth/components/protected-route';
import { ActionTypes } from '../../constants';
import { AppContext } from '../../context';
import { AuthContext } from '../../context/auth/AuthContext';
import { getAllOrder, getUserById } from '../../services/api-user.service';

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const { store, dispatch } = useContext(AppContext);
  console.log('🚀 ~ file: index.tsx ~ line 11 ~ HomePage ~ store', {
    store,
    dispatch,
  });
  useEffect(() => {
    const fetchData = async () => {
      const res2 = await getUserById(1);
      // console.log('🚀 ~ file: index.tsx ~ line 12 ~ fetchData ~ list', {
      //   res2,
      // });
    };
    fetchData();
  }, []);

  return (
    <ProtectedRoute>
      <>
        <div>Day la home page 1 {user.username}</div>
        <button
          onClick={() =>
            dispatch({
              type: ActionTypes.AddStockOrder,
              payload: {
                createdAt: '2022-02-06T10:03:34.000Z',
                isBuy: 0,
                isDone: 0,
                orderId: 15,
                orderTypeId: 1,
                price: 19800,
                quantity: 1000,
                statusId: 1,
                stockSymbol: 'HNG',
                userId: 3,
              },
            })
          }
        >
          Add
        </button>
      </>
    </ProtectedRoute>
  );
};

export default HomePage;
