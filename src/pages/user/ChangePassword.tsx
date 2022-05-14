import { Button, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ValidateMessage from '../../components/ValidateMessage';
import { UserStatusLabel, WEAK_PASSWORDS } from '../../constants';
import { AppContext } from '../../context';
import { User } from '../../services/api-admin.type';
import { customerChangePassword } from '../../services/api-auth.service';
import { ChangePasswordPayload } from '../../services/api-auth.type';
import { editUserSecretInfo } from '../../services/api-user.service';
import { EditUserPayload } from '../../services/api-user.type';

const ChangePassword = () => {
  const {
    userInfo: { user, citizenIdentity },
    fetchUser,
  } = React.useContext(AppContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<ChangePasswordPayload>({ mode: 'onBlur' });
  const [isViewing, setIsViewing] = useState(false);

  const resetValue = () => {
    setValue('password', '');
    setValue('oldPassword', '');
    setValue('confirmPassword', '');
  };

  const updateUserHandler: SubmitHandler<ChangePasswordPayload> = async (data) => {
    try {
      const res = await customerChangePassword(data);
      toast('Đổi mật khẩu thành công');
      resetValue();
      setIsViewing(true);
    } catch (error: any) {
      toast(error?.message || error?.data.message);
    }
  };
  return (
    <div className="bg-white w-11/12 h-full p-10">
      <form className="mx-[110px]" onSubmit={handleSubmit(updateUserHandler)}>
        <div>
          <div className="flex mb-8">
            <span className="block mr-4 text-gray-400 min-w-[150px]">Tài khoản</span>
            <span>{user.username}</span>
          </div>

          <div className="flex mb-8">
            <span className="block mr-4 text-gray-400 min-w-[150px]">Mật khẩu cũ</span>
            <div className="flex">
              <span className="block min-w-[100px]">
                <TextField
                  sx={{ minWidth: 450, maxWidth: 450 }}
                  required
                  type={'password'}
                  variant="outlined"
                  disabled={isViewing}
                  className="w-full"
                  {...register('oldPassword', {
                    required: {
                      value: true,
                      message: 'Trường này bắt buộc phải nhập',
                    },
                  })}
                />
                {errors.oldPassword && <ValidateMessage>{errors.oldPassword.message}</ValidateMessage>}
              </span>
            </div>
          </div>

          <div className="flex mb-8">
            <span className="block mr-4 text-gray-400 min-w-[150px]">Mật khẩu mới</span>
            <div className="flex">
              <span className="block min-w-[100px]">
                <TextField
                  sx={{ minWidth: 450, maxWidth: 450 }}
                  required
                  type={'password'}
                  variant="outlined"
                  disabled={isViewing}
                  className="w-full"
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'Trường này bắt buộc phải nhập',
                    },
                    validate: {
                      weakPassword: (v) =>
                        !WEAK_PASSWORDS.includes(v) || 'Mật khẩu không được nằm trong danh sách mật khẩu yếu',
                    },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*+='"<>\]\[\|-]).{8,}$/i,
                      message:
                        'Mật khẩu cần tối thiểu 8 ký tự, ít nhất 1 chữ cái viết hoa, 1 chữ cái viết thường và 1 số',
                    },
                  })}
                />
                {errors.password && <ValidateMessage>{errors.password.message}</ValidateMessage>}
              </span>
            </div>
          </div>

          <div className="flex mb-8">
            <span className="block mr-4 text-gray-400 min-w-[150px]">Xác nhận mật khẩu</span>
            <div className="flex">
              <span className="block min-w-[100px]">
                <TextField
                  sx={{ minWidth: 450, maxWidth: 450 }}
                  required
                  type={'password'}
                  variant="outlined"
                  disabled={isViewing}
                  className="w-full"
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
              </span>
            </div>
          </div>
        </div>
        <div className="ml-[80px]">
          {isViewing ? (
            <Button
              type="button"
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                setIsViewing((prev) => !prev);
              }}
            >
              Chỉnh sửa
            </Button>
          ) : (
            <>
              <Button
                type="button"
                variant="outlined"
                onClick={(e) => {
                  e.preventDefault();
                  setIsViewing((prev) => !prev);
                  resetValue();
                }}
                className="mx-3"
              >
                Hủy
              </Button>
              <Button type="submit" variant="contained">
                Lưu
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
