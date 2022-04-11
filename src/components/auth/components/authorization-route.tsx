import { ReactElement, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoleIdType } from '../../../constants';
import { PATH_NAMES } from '../../../constants/path-name';
import { AuthContext } from '../../../context/auth/AuthContext';


const AuthorizationRoute = (props: { children: ReactElement }) => {
  const { user } = useContext(AuthContext)
  const navigation = useNavigate()

  useEffect(() => {
    if (![RoleIdType.admin, RoleIdType.moderator].includes(user.roleId)) {
      navigation(PATH_NAMES.unauthorized)
    };
  }, [])

  return props.children;
};

export default AuthorizationRoute;
