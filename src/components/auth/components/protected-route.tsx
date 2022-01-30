import { ReactElement, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pathNames } from '../../../constants/path-name';
import { AuthContext } from '../../../context/auth/auth';


const ProtectedRoute = (props: { children: ReactElement }) => {
  const { isAuthenticated } = useContext(AuthContext)
  const navigation = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigation(pathNames.login)
    };
  }, [])

  return props.children;
};

export default ProtectedRoute;
