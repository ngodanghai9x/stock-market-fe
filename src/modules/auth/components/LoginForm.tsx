import { Button } from '@mui/material';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ValidateMessage from '../../../components/ValidateMessage';
import { OPTIONS_USE_FORM } from '../../../constants';
import { AuthContext } from '../../../context/auth/AuthContext';
import { login } from '../../../lib/utils';
import { LoginPayload } from '../../../services/api-auth.type';
import AuthInput from './AuthInput';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    // reValidateMode: 'onBlur',
    mode: 'onBlur',
  });
  const { setUser, setAuthenticated } = useContext(AuthContext);

  const loginHandle: SubmitHandler<LoginPayload> = async (data) => {
    try {
      const res = await login(data);
      setUser(res.data?.user);
      setAuthenticated(true);
      toast(res.message);
    } catch (error: any) {
      toast(error?.message || error?.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(loginHandle)} className="w-ful">
      <div className="group flex flex-col mb-8">
        <AuthInput label="Tài khoản" {...register('username', { required: true })} />
        {errors.username && <ValidateMessage>Trường này bắt buộc phải nhập</ValidateMessage>}
      </div>
      <div className="group flex flex-col mb-10">
        <AuthInput label="Mật khẩu" type="password" {...register('password', { required: true })} />
        {errors.password && <ValidateMessage>Trường này bắt buộc phải nhập</ValidateMessage>}
      </div>
      <div className="flex justify-center">
        <Button className="" type="submit" variant="contained" children="Đăng nhập" />
      </div>
    </form>
  );
};
