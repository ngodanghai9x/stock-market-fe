import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AppContext } from '../../context';
import { User } from '../../services/api-admin.type';
import { customerChangePassword } from '../../services/api-auth.service';
import IdentificationSvg from './Icon/IdentificationSvg';
import PaymentSvg from './Icon/PaymentSvg';
import SecuritySvg from './Icon/SecuritySvg';
import UserSvg from './Icon/UserSvg';

const UserDashboard = () => {
  const { register, handleSubmit } = useForm<User>();

  const {
    userInfo: { user, citizenIdentity },
  } = React.useContext(AppContext);

  const registerHandler: SubmitHandler<User> = async (data) => {
    // const res = await customerDashboard(data);
    // console.log(res)
  };

  return (
    <div>
      <form onSubmit={handleSubmit(registerHandler)}>
        <input type="text" {...register('fullName')} />
        <input type="text" {...register('phone')} />
        <input type="text" {...register('birthday')} />
        <div>
          {/* <UserSvg/>
        <SecuritySvg/>
        <IdentificationSvg/>
        <PaymentSvg/> */}
        </div>
        <input type="submit" value="oke" />
      </form>
    </div>
  );
};

export default UserDashboard;
