import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ValidateMessage from '../../../components/ValidateMessage';
import { WEAK_PASSWORDS } from '../../../constants';
import { PATH_NAMES } from '../../../constants/path-name';
import { customerRegister } from '../../../services/api-auth.service';
import { RegisterPayload } from '../../../services/api-auth.type';
import AuthInput from './AuthInput';

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterPayload>({ mode: 'onBlur' });
  const navigate = useNavigate();
  const [hasCaptchaToken, setHasCaptchaToken] = useState(false);

  const onSubmit: SubmitHandler<RegisterPayload> = async (data) => {
    try {
      const res = await customerRegister(data);
      toast(res.message);
      navigate(PATH_NAMES.login);
    } catch (error: any) {
      toast(error?.message || error?.data.message);
    }
  };

  function onChange(value: any) {
    if (value) {
      setHasCaptchaToken(true);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="group flex flex-col mb-8">
          <AuthInput
            label="Tài khoản:"
            {...register('username', { required: true, pattern: /^[a-zA-Z_\d]{3,255}$/i })}
          />
          {errors.username && (
            <ValidateMessage>
              Tên tài khoản chỉ bao gồm chữ cái, chữ số, dấu _, độ dài tối thiểu là 3 kí tự
            </ValidateMessage>
          )}
        </div>
        <div className="group flex flex-col mb-8">
          <AuthInput
            label="Mật khẩu:"
            type="password"
            {...register('password', {
              required: true,
              validate: {
                weakPassword: (v) =>
                  !WEAK_PASSWORDS.includes(v) || 'Mật khẩu không được nằm trong danh sách mật khẩu yếu',
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*+='"<>\]\[\|-]).{8,}$/i,
                message: 'Mật khẩu cần tối thiểu 8 ký tự, ít nhất 1 chữ cái viết hoa, 1 chữ cái viết thường và 1 số',
              },
            })}
          />
          {errors.password && <ValidateMessage>{errors.password.message}</ValidateMessage>}
        </div>
        <div className="group flex flex-col mb-8">
          <AuthInput
            label="Xác nhận mật khẩu:"
            type="password"
            {...register('confirmPassword', {
              required: {
                value: true,
                message: 'Trường này bắt buộc phải nhập',
              },
              validate: {
                samePassword: (v) => v === getValues('password') || 'Hai mật khẩu không trùng nhau',
              },
            })}
          />
          {errors.confirmPassword && <ValidateMessage>{errors.confirmPassword.message}</ValidateMessage>}
        </div>
        <div className="group flex flex-col mb-8">
          <AuthInput label="Họ và tên:" {...register('fullName', { required: true })} />
          {errors.fullName && <ValidateMessage>Trường này bắt buộc phải nhập</ValidateMessage>}
        </div>
        <div className="group flex flex-col mb-10">
          <AuthInput
            label="Email:"
            {...register('email', {
              required: true,
              pattern: /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/i,
            })}
          />
          {errors.email && <ValidateMessage>Email không đúng định dạng</ValidateMessage>}
        </div>
        <div className="flex justify-center mb-3">
          <ReCAPTCHA sitekey={process.env.REACT_APP_CAPTCHA_KEY || ''} onChange={onChange} size="normal" />
        </div>
        <input
          disabled={!hasCaptchaToken}
          type="submit"
          value="Đăng ký"
          className="w-3/6 mx-auto block bg-lightBlue-300 py-3 text-white rounded-3xl font-medium cursor-pointer"
        />
      </form>
    </div>
  );
};
