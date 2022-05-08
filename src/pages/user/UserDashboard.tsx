import { Button, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { UserStatusLabel } from '../../constants';
import { AppContext } from '../../context';
import { User } from '../../services/api-admin.type';
import { editUserInfo } from '../../services/api-user.service';
import { EditUserPayload } from '../../services/api-user.type';

const UserDashboard = () => {
  const {
    userInfo: { user, citizenIdentity },
    fetchUser,
  } = React.useContext(AppContext);

  const [birthday, setBirthday] = useState<string | null | Date>(user.birthday);
  const { register, handleSubmit, setValue } = useForm<EditUserPayload>();
  const [isViewing, setIsViewing] = useState(true);

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
      toast('Sửa thông tin người dùng thành công');
      fetchUser().then(() => {
        resetValue();
        setIsViewing(true);
      });
    } catch (error: any) {
      toast(error.response.data.message);
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
            <span>{user.email}</span>
          </div>
          <div className="flex mb-8">
            <span className="block mr-4 text-gray-400 min-w-[150px]">Họ và tên</span>
            <div className="flex">
              <span className="block min-w-[100px]">
                {/* <input
                  type="text"
                  className={`${isViewing ? '' : 'border'} p-2`}
                  {...register('user.fullName')}
                /> */}
                <TextField
                  sx={{ minWidth: 450 }}
                  required
                  variant="outlined"
                  disabled={isViewing}
                  className="w-full"
                  {...register('user.fullName', { required: true })}
                />
              </span>
            </div>
          </div>
          <div className="flex mb-8">
            <span className="block mr-4 text-gray-400 min-w-[150px]">Ngày sinh nhật</span>
            <div className="flex">
              <span className="block min-w-[100px]">
                {/* <input
                  type="text"
                  disabled={isViewing}
                  className={`${isViewing ? '' : 'border'} p-2`}
                  {...register('user.birthday')}
                /> */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={birthday}
                    onChange={(newValue) => {
                      setBirthday(newValue);
                    }}
                    renderInput={(params) => <TextField sx={{ minWidth: 450 }} {...params} />}
                    disabled={isViewing}
                  />
                </LocalizationProvider>
              </span>
            </div>
          </div>
          <div className="flex mb-8">
            <span className="block mr-4 text-gray-400 min-w-[150px]">Trạng thái</span>
            <span>{UserStatusLabel[user.userStatus]}</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserDashboard;
