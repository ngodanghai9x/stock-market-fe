import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AppContext } from '../../context';
import { User } from '../../services/api-admin.type';
import { customerChangePassword } from '../../services/api-auth.service';
import { editUserInfo } from '../../services/api-user.service';
import { EditUserPayload } from '../../services/api-user.type';
import IdentificationSvg from './Icon/IdentificationSvg';
import PaymentSvg from './Icon/PaymentSvg';
import SecuritySvg from './Icon/SecuritySvg';
import UserSvg from './Icon/UserSvg';

const UserDashboard = () => {
  const {
    userInfo: { user, citizenIdentity },
  } = React.useContext(AppContext);

  const [birthday, setBirthday] = useState<string | null>(user.birthday ?(new Date(user.birthday)).toISOString() : null);
  console.log(birthday)
  const { register, handleSubmit, setValue } = useForm<EditUserPayload>();
  const [isEditing, setIsEditting] = useState(true);

  useEffect(() => {
    if (user) {
      setValue('user.birthday', user.birthday || '');
      setValue('user.fullName', user.fullName || '');
    }
  }, [user]);

  const updateUserHandler: SubmitHandler<EditUserPayload> = async (data) => {
    const editedUser = {
      user: {
        ...user,
        ...data.user,
        birthday: birthday?  birthday : null,
      },
    } as unknown as EditUserPayload;
    try {
    const res = await editUserInfo(editedUser, user.userId);
    toast('updated successful');
    } catch (error : any) {
      toast(error.response.data.message);

    }
  };
  return (
    <div className="bg-white w-11/12 h-full p-10">
      {/* <form onSubmit={handleSubmit(registerHandler)}>
        <input type="text" disabled {...register('user.username')} />
        <input type="text" disabled {...register('user.email')} />
        <input type="text" disabled {...register('user.phone')} />
        <input type="text" {...register('user.fullName')} />
        <input type="text" {...register('user.birthday')} />
        <div>
        </div>
        <input type="submit" value="oke" />
      </form> */}
      <form onSubmit={handleSubmit(updateUserHandler)}>
        <div className="flex justify-end">
          {isEditing ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsEditting((prev) => !prev);
              }}
            >
              Chỉnh sửa
            </button>
          ) : (
            <input value="Lưu" type="submit" />
          )}
        </div>
        <div>
          <div className="flex mb-8">
            <span className="block mr-4 text-gray-400 min-w-[150px]">Email</span>
            <span>{user.email}</span>
          </div>
          <div className="flex mb-8">
            <span className="block mr-4 text-gray-400 min-w-[150px]">Full name</span>
            <div className="flex">
              <span className="block min-w-[100px]">
                <input
                  type="text"
                  className={`${isEditing ? '' : 'border'} p-2`}
                  disabled={isEditing}
                  {...register('user.fullName')}
                />
              </span>
            </div>
          </div>
          <div className="flex mb-8">
            <span className="block mr-4 text-gray-400 min-w-[150px]">Birthday</span>
            <div className="flex">
              <span className="block min-w-[100px]">
                {/* <input
                  type="text"
                  disabled={isEditing}
                  className={`${isEditing ? '' : 'border'} p-2`}
                  {...register('user.birthday')}
                /> */}
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={birthday}
                  onChange={(newValue) => {
                    setBirthday(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              </span>
            </div>
          </div>
          <div className="flex mb-8">
            <span className="block mr-4 text-gray-400 min-w-[150px]">User status</span>
            <span>{user.userStatus}</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserDashboard;
