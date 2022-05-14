import { Button, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { UserStatusLabel } from '../../constants';
import { AppContext } from '../../context';
import { numberWithCommas } from '../../lib/utils';
import { User } from '../../services/api-admin.type';
import { editUserInfo } from '../../services/api-user.service';
import { EditUserPayload } from '../../services/api-user.type';

const Payment = () => {
  const {
    userInfo: { user, citizenIdentity },
    fetchUser,
  } = React.useContext(AppContext);

  const [birthday, setBirthday] = useState<string | null | Date>(user.birthday);
  const { register, handleSubmit, setValue } = useForm<EditUserPayload>();

  const resetValue = () => {
    if (user) {
      setValue('user.birthday', user.birthday || '');
      setValue('user.fullName', user.fullName || '');
    }
  };

  useEffect(() => {
    resetValue();
  }, [user]);

  const updateUserHandler: SubmitHandler<EditUserPayload> = async (data) => {
    const editedUser = {
      user: {
        ...data.user,
        birthday: birthday ? birthday : null,
      },
    } as EditUserPayload;
    try {
      const res = await editUserInfo(editedUser, user.userId);
      toast(res.message);
      fetchUser().then(() => {
        resetValue();
      });
    } catch (error: any) {
      toast(error?.message || error?.data.message);
    }
  };
  return (
    <div className="bg-white w-11/12 h-full p-10">
      <form className="mx-[110px]" onSubmit={handleSubmit(updateUserHandler)}>
        <div>
          <div className="flex mb-5">
            <span className="block mr-4 text-gray-400 min-w-[150px]">Tài khoản ngân hàng</span>
            <span>{user?.bankNumber}</span>
          </div>
          <div className="flex mb-5">
            <span className="block mr-4 text-gray-400 min-w-[150px]">Số dư</span>
            <span>{numberWithCommas(user.money) || 0}</span>
          </div>
          <div className="flex mb-6">
            <span className="block mr-4 text-gray-400 min-w-[150px]">Số dư bị phong tỏa</span>
            <span>{numberWithCommas(user.lockedMoney) || 0}</span>
          </div>
          <div className="flex mb-8">
            <span className="block mr-4 text-gray-400 min-w-[150px]">Số tiền muốn rút</span>
            <div className="flex">
              <span className="block min-w-[100px]">
                <TextField
                  sx={{ minWidth: 450, maxWidth: 450 }}
                  required
                  variant="outlined"
                  className="w-full"
                  {...register('user.fullName', { required: true })}
                />
              </span>
            </div>
          </div>
          <div className="flex mb-8">
            <span className="block mr-4 text-gray-400 min-w-[150px]">Mã OTP</span>
            <div className="flex">
              <span className="block min-w-[100px]">
                <TextField
                  sx={{ minWidth: 450, maxWidth: 450 }}
                  required
                  variant="outlined"
                  className="w-full"
                  {...register('user.fullName', { required: true })}
                />
              </span>
            </div>
          </div>
          <div className="flex mb-8">
            <span className="block mr-4 text-gray-400 min-w-[150px]">Mật khẩu cũ</span>
            <div className="flex">
              <span className="block min-w-[100px]">
                <TextField
                  sx={{ minWidth: 450, maxWidth: 450 }}
                  required
                  type="password"
                  variant="outlined"
                  className="w-full"
                  {...register('user.fullName', { required: true })}
                />
              </span>
            </div>
          </div>
        </div>
        <>
          <Button
            type="button"
            variant="outlined"
            onClick={(e) => {
              e.preventDefault();
              resetValue();
            }}
            className="mx-3"
          >
            Gửi lại mã OTP
          </Button>
          <Button type="submit" variant="contained">
            Rút tiền
          </Button>
        </>
      </form>
    </div>
  );
};

export default Payment;
