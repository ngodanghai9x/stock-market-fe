import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { User } from '../../services/api-admin.type';
import { customerChangePassword } from '../../services/api-auth.service';

const Payment = () => {
  const { register, handleSubmit } = useForm<User>()

  const registerHandler: SubmitHandler<User> = async (data) => {
    // const res = await customerPayment(data);
    // console.log(res)
  }

  return <div>
    <form onSubmit={handleSubmit(registerHandler)}>
      <input type="text" {...register('email')} />
      <input type="text" {...register('antiPhishingCode')} />
      <input type="submit" value="oke" />
    </form>
  </div>;
};

export default Payment;
