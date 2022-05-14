import { Button, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { UserStatusLabel } from '../../constants';
import { AppContext } from '../../context';
import { User } from '../../services/api-admin.type';
import { editUserSecretInfo } from '../../services/api-user.service';
import { EditUserPayload } from '../../services/api-user.type';

const Security = () => {
  const {
    userInfo: { user, citizenIdentity },
    fetchUser,
  } = React.useContext(AppContext);

  const { register, handleSubmit, setValue } = useForm<EditUserPayload>();
  const [isViewing, setIsViewing] = useState(true);

  const resetValue = () => {
    setValue('user.email', user?.email || '');
    setValue('user.phone', user?.phone || '');
    setValue('user.antiPhishingCode', user?.antiPhishingCode || '');
    setValue('password', '');
  };

  useEffect(() => {
    resetValue();
  }, [user]);

  const updateUserHandler: SubmitHandler<EditUserPayload> = async (data) => {
    const editedUser = {
      user: {
        ...data.user,
      },
      password: data.password,
    } as EditUserPayload;
    try {
      const res = await editUserSecretInfo(editedUser, user.userId);
      toast(res.message);
      fetchUser().then(() => {
        resetValue();
        setIsViewing(true);
      });
    } catch (error: any) {
      toast(error?.message || error?.data.message);
    }
  };
  return (
    <div className="bg-white w-11/12 h-full p-10">
      <form className="mx-[110px]" onSubmit={handleSubmit(updateUserHandler)}>
        <div className="flex justify-end">
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
        <div>
          <div className="flex mb-8">
            <span className="block mr-4 text-gray-400 min-w-[150px]">Tài khoản</span>
            <span>{user.username}</span>
          </div>

          <div className="flex mb-8">
            <span className="block mr-4 text-gray-400 min-w-[150px]">Email</span>
            <div className="flex">
              <span className="block min-w-[100px]">
                <TextField
                  sx={{ minWidth: 450, maxWidth: 450  }}
                  required
                  variant="outlined"
                  disabled={isViewing}
                  className="w-full"
                  {...register('user.email', { required: true })}
                />
              </span>
            </div>
          </div>

          <div className="flex mb-8">
            <span className="block mr-4 text-gray-400 min-w-[150px]">Số điện thoại</span>
            <div className="flex">
              <span className="block min-w-[100px]">
                <TextField
                  sx={{ minWidth: 450, maxWidth: 450  }}
                  variant="outlined"
                  disabled={isViewing}
                  className="w-full"
                  {...register('user.phone')}
                />
              </span>
            </div>
          </div>

          <div className="flex mb-8">
            <span className="block mr-4 text-gray-400 min-w-[150px]">Mã chống lừa đảo</span>
            <div className="flex">
              <span className="block min-w-[100px]">
                <TextField
                  sx={{ minWidth: 450, maxWidth: 450  }}
                  variant="outlined"
                  disabled={isViewing}
                  className="w-full"
                  {...register('user.antiPhishingCode')}
                />
              </span>
            </div>
          </div>

          <div className="flex mb-8">
            <span className="block mr-4 text-gray-400 min-w-[150px]">Mật khẩu</span>
            <div className="flex">
              <span className="block min-w-[100px]">
                <TextField
                  sx={{ minWidth: 450, maxWidth: 450  }}
                  required
                  type={'password'}
                  variant="outlined"
                  disabled={isViewing}
                  className="w-full"
                  {...register('password', { required: true })}
                />
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Security;
