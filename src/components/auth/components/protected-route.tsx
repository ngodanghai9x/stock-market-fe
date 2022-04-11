import { ReactElement, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_NAMES } from '../../../constants/path-name';
import { AuthContext } from '../../../context/auth/AuthContext';


const ProtectedRoute = (props: { children: ReactElement }) => {
  const { isAuthenticated } = useContext(AuthContext)
  const navigation = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigation(PATH_NAMES.login)
    };
  }, [])

  return props.children;
};

export default ProtectedRoute;
