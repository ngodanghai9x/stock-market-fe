import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ValidateMessage from '../../../components/ValidateMessage';
import { WEAK_PASSWORDS } from '../../../constants';
import { PATH_NAMES } from '../../../constants/path-name';
import { customerChangeForgotPw, getForgotPwOtp } from '../../../services/api-auth.service';
import { ChangeForgotPwPayload } from '../../../services/api-auth.type';
import AuthInput from './AuthInput';

export const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ChangeForgotPwPayload>({ mode: 'onBlur' });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ChangeForgotPwPayload> = async (data) => {
    try {
      const res = await customerChangeForgotPw(data);
      toast(res.data.message);
      navigate(PATH_NAMES.login);
    } catch (error: any) {
      console.log(error);
      toast(error.response.data.message);
    }
  };

  const onSendOTP = async () => {
    try {
      const res = await getForgotPwOtp('mod');
      console.log('onSendOTP', res);
    } catch (error: any) {
      console.log(error);
      toast(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="group flex flex-col mb-8">
          <AuthInput label="Tài khoản:" {...register('username', { required: true, pattern: /^[a-z_\d]{6,255}$/i })} />
          {errors.username && (
            <ValidateMessage>
              Tên tài khoản chỉ bao gồm chữ cái, chữ số, dấu _, độ dài tối thiểu là 6 kí tự
            </ValidateMessage>
          )}
        </div>
        <div className="group flex flex-col mb-8">
          <AuthInput label="Mã OTP:" {...register('otpForget', { required: true })} />
          {errors.otpForget && <ValidateMessage>Trường này bắt buộc phải nhập</ValidateMessage>}
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
                samePassword: (v) => v === getValues('password') || 'Mật khẩu không khớp',
              },
            })}
          />
          {errors.confirmPassword && <ValidateMessage>{errors.confirmPassword.message}</ValidateMessage>}
        </div>
        <div className="flex">
          <input
            type="button"
            value="Gửi OTP"
            onClick={onSendOTP}
            className="w-3/6 mx-auto block bg-lightBlue-300 py-3 text-white rounded-3xl font-medium"
          />
          <input
            type="submit"
            value="Đổi mật khẩu"
            className="w-3/6 mx-auto block bg-lightBlue-300 py-3 text-white rounded-3xl font-medium"
          />
        </div>
      </form>
    </div>
  );
};
