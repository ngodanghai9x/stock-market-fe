import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AppContext } from '../../context';
import { User } from '../../services/api-admin.type';
import { customerChangePassword } from '../../services/api-auth.service';

const Security = () => {
  const { register, handleSubmit } = useForm<User>();

  const {
    userInfo: { user, citizenIdentity },
  } = React.useContext(AppContext);

  const registerHandler: SubmitHandler<User> = async (data) => {
    // const res = await customerSecurity(data);
    // console.log(res)
  };

  return (
    <div>
      <form onSubmit={handleSubmit(registerHandler)}>
        <input type="text" {...register('email')} />
        <input type="text" {...register('antiPhishingCode')} />
        <input type="submit" value="oke" />
      </form>
    </div>
  );
};

export default Security;
