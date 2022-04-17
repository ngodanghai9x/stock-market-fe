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
      Cookies.remove(STORAGE.jwtToken);
      localStorage.removeItem(STORAGE.userData);
      await customerLogout();
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
      <input
        type="submit"
        disabled
        value="Đăng nhập"
        className="cursor-pointer w-3/6 mx-auto block bg-lightBlue-300 py-3 text-white rounded-3xl font-medium"
      />
    </form>
  );
};
