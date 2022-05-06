import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AppContext } from '../../context';
import { User } from '../../services/api-admin.type';
import { customerChangePassword } from '../../services/api-auth.service';
import { EditUserPayload } from '../../services/api-user.type';

const Security = () => {
  const { register, handleSubmit } = useForm<EditUserPayload>();

  const {
    userInfo: { user, citizenIdentity },
  } = React.useContext(AppContext);

  const registerHandler: SubmitHandler<EditUserPayload> = async (data) => {
    // const res = await customerSecurity(data);
    // console.log(res)
  };

  return (
    <div>
      <form onSubmit={handleSubmit(registerHandler)}>
        <input type="text" {...register('user.email')} />
        <input type="text" {...register('user.phone')} />
        <input type="text" {...register('user.antiPhishingCode')} />
        <input type="text" {...register('password')} />
        <input type="submit" value="oke" />
      </form>
    </div>
  );
};

export default Security;
