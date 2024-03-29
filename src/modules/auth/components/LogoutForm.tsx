import { Button } from '@mui/material';
import Cookies from 'js-cookie';
import { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ValidateMessage from '../../../components/ValidateMessage';
import { STORAGE } from '../../../constants';
import { PATH_NAMES } from '../../../constants/path-name';
import { customerLogout } from '../../../services/api-auth.service';
import { LoginPayload } from '../../../services/api-auth.type';
import AuthInput from './AuthInput';

export const LogoutForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>();
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      customerLogout();
      Cookies.remove(STORAGE.jwtToken);
      localStorage.removeItem(STORAGE.userData);
      localStorage.removeItem(STORAGE.otpTrading);
      navigate(PATH_NAMES.login);
    };
    logout();
  }, [navigate]);

  return (
    <form className="w-ful">
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
