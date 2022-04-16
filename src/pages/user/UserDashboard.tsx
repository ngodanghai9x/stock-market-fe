import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { User } from '../../services/api-admin.type';
import { customerChangePassword } from '../../services/api-auth.service';

const UserDashboard = () => {
  const { register, handleSubmit } = useForm<User>()

  const registerHandler: SubmitHandler<User> = async (data) => {
    // const res = await customerDashboard(data);
    // console.log(res)
  }

  return <div>
    <form onSubmit={handleSubmit(registerHandler)}>
      <input type="text" {...register('fullName')} />
      <input type="text" {...register('phone')} />
      <input type="text" {...register('birthday')} />
      <input type="submit" value="oke" />
    </form>
  </div>;
};

export default UserDashboard;
