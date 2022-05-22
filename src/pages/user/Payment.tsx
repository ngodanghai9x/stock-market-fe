import { Button, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { getValue } from '@testing-library/user-event/dist/utils';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ValidateMessage from '../../components/ValidateMessage';
import { UserStatusLabel } from '../../constants';
import { AppContext } from '../../context';
import { numberWithCommas } from '../../lib/utils';
import { User } from '../../services/api-admin.type';
import { drawMoney, editUserInfo, sendOpt } from '../../services/api-user.service';
import { DrawMoneyPayload, EditUserPayload } from '../../services/api-user.type';

const Payment = () => {
  const {
    userInfo: { user, citizenIdentity },
    fetchUser,
  } = React.useContext(AppContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DrawMoneyPayload>();

  const resetForm = () => {
    setValue('bankNumber', '');
    setValue('money', 0);
    setValue('otp', '');
    setValue('oldPassword', '');
  };

  const drawMoneyHandler: SubmitHandler<DrawMoneyPayload> = async (data) => {
    try {
      const res = await drawMoney({ ...data, bankNumber: user.bankNumber || '' });
      resetForm();
      fetchUser();
      toast(res.message);
    } catch (err: any) {
      toast(err?.message);
    }
  };

  const sendOptHandler = async () => {
    try {
      const res = await sendOpt(user.username);
      // toast(res.message)
    } catch (error: any) {
      toast(error);
      console.error(error);
    }
  };

  return (
    <div className="bg-white w-11/12 h-full p-10">
      <form className="mx-[110px]" onSubmit={handleSubmit(drawMoneyHandler)}>
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
            <div className="flex flex-col">
              <span className="block min-w-[100px]">
                <TextField
                  sx={{ minWidth: 450, maxWidth: 450 }}
                  required
                  type="number"
                  variant="outlined"
                  className="w-full"
                  {...register('money', {
                    required: true,
                    valueAsNumber: true,
                    validate: {
                      greaterThanCurrentMoney: (value) => value < Number(user.money),
                    },
                  })}
                />
              </span>
              {errors.money && <ValidateMessage>Số dư không đủ</ValidateMessage>}
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
                  {...register('otp', { required: true })}
                />
              </span>
            </div>
          </div>
          <div className="flex mb-8">
            <span className="block mr-4 text-gray-400 min-w-[150px]">Mật khẩu cũ</span>
            <div className="flex flex-col">
              <span className="block min-w-[100px]">
                <TextField
                  sx={{ minWidth: 450, maxWidth: 450 }}
                  required
                  type="password"
                  variant="outlined"
                  className="w-full"
                  {...register('oldPassword', { required: true })}
                />
              </span>
              {errors.oldPassword && <ValidateMessage>Mật khẩu không hợp lệ</ValidateMessage>}
            </div>
          </div>
        </div>
        <>
          <Button
            type="button"
            variant="outlined"
            onClick={(e) => {
              e.preventDefault();
              sendOptHandler();
            }}
            className="mx-3"
          >
            Lấy mã OTP
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
