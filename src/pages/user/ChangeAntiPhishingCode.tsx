import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { customerChangePassword } from '../../services/api-auth.service';

type RegisterForm = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

const ChangeAntiPhishingCode = () => {
  const { register, handleSubmit } = useForm<RegisterForm>()

  const registerHandler: SubmitHandler<RegisterForm> = async (data) => {
    // const res = await customerChangeAntiPhishingCode(data);
    // console.log(res)
  }

  return <div>
    <form onSubmit={handleSubmit(registerHandler)}>
      <input type="text" {...register('oldPassword')} />
      <input type="text" {...register('password')} />
      <input type="text" {...register('confirmPassword')} />
      <input type="submit" value="oke" />
    </form>
  </div>;
};

export default ChangeAntiPhishingCode;