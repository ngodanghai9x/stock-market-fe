import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CitizenIdentity } from '../../services/api-admin.type';
import { customerChangePassword } from '../../services/api-auth.service';


const Identification = () => {
  const { register, handleSubmit } = useForm<CitizenIdentity>()

  const registerHandler: SubmitHandler<CitizenIdentity> = async (data) => {
    // const res = await customerIdentification(data);
    // console.log(res)
  }

  return <div>
    <form onSubmit={handleSubmit(registerHandler)}>
      <input type="text" {...register('number')} />
      <input type="text" {...register('name')} />
      <input type="text" {...register('birthday')} />
      <input type="text" {...register('gender')} />
      <input type="submit" value="oke" />
    </form>
  </div>;
};

export default Identification;
