import { Button, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Gender, UserStatusLabel } from '../../constants';
import { AppContext } from '../../context';
import { User } from '../../services/api-admin.type';
import { editUserInfo } from '../../services/api-user.service';
import { EditUserPayload } from '../../services/api-user.type';

const Identification = () => {
  const {
    userInfo: { user, citizenIdentity },
    fetchUser,
  } = React.useContext(AppContext);

  const [birthday, setBirthday] = useState<string | null | Date>(citizenIdentity?.birthday || null);
  const [createDate, setCreateDate] = useState<string | null | Date>(citizenIdentity?.createDate || null);
  const [expiryDate, setExpiryDate] = useState<string | null | Date>(citizenIdentity?.expiryDate || null);
  const [cardExpiryDate, setCardExpiryDate] = useState<string | null | Date>(citizenIdentity?.cardExpiryDate || null);
  const { register, handleSubmit, setValue } = useForm<EditUserPayload>();
  const [isViewing, setIsViewing] = useState(true);

  const resetValue = () => {
    if (citizenIdentity) {
      setValue('citizenIdentity.number', citizenIdentity.number || '');
      setValue('citizenIdentity.name', citizenIdentity.name || '');
      setValue('citizenIdentity.birthday', citizenIdentity.birthday || '');
      setValue('citizenIdentity.gender', citizenIdentity.gender || Gender.Other);
      setValue('citizenIdentity.originAddress', citizenIdentity.originAddress || '');
      setValue('citizenIdentity.residenceAddress', citizenIdentity.residenceAddress || '');
      setValue('citizenIdentity.createDate', citizenIdentity.createDate || '');
      setValue('citizenIdentity.expiryDate', citizenIdentity.expiryDate || '');
      setValue('citizenIdentity.createBy', citizenIdentity.createBy || '');
      setValue('citizenIdentity.cardNumber', citizenIdentity.cardNumber || '');
      setValue('citizenIdentity.cardExpiryDate', citizenIdentity.cardExpiryDate || '');
    }
  };

  useEffect(() => {
    resetValue();
  }, [citizenIdentity]);

  const updateUserHandler: SubmitHandler<EditUserPayload> = async (data) => {
    const editedUser = {
      citizenIdentity: {
        ...data.citizenIdentity,
        birthday: birthday ? birthday : null,
        createDate: createDate ? createDate : null,
        expiryDate: expiryDate ? expiryDate : null,
        cardExpiryDate: cardExpiryDate ? cardExpiryDate : null,
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
      toast(error?.message || error?.data.message);
    }
  };
  return (
    <div className="bg-white w-11/12 h-full p-10">
      <form className="" onSubmit={handleSubmit(updateUserHandler)}>
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
        <div className="flex mb-8">
          <span className="block mr-4 text-gray-400 min-w-[150px]">Tài khoản Identification</span>
          <span>{user.username}</span>
        </div>
        <div className='grid grid-cols-2'>
          <div className="flex mb-8">
            <span className="block mr-4 text-gray-400 min-w-[150px]">number</span>
            <div className="flex">
              <span className="block min-w-[100px]">
                {/* <input
                  type="text"
                  className={`${isViewing ? '' : 'border'} p-2`}
                  {...register('user.fullName')}
                /> */}
                <TextField
                  sx={{ minWidth: 300, maxWidth: 300 }}
                  required
                  variant="outlined"
                  disabled={isViewing}
                  className="w-full"
                  {...register('citizenIdentity.number', { required: true })}
                />
              </span>
            </div>
          </div>
          <div className="flex mb-8">
            <span className="block mr-4 text-gray-400 min-w-[150px]">name</span>
            <div className="flex">
              <span className="block min-w-[100px]">
                {/* <input
                  type="text"
                  className={`${isViewing ? '' : 'border'} p-2`}
                  {...register('user.fullName')}
                /> */}
                <TextField
                  sx={{ minWidth: 300, maxWidth: 300 }}
                  required
                  variant="outlined"
                  disabled={isViewing}
                  className="w-full"
                  {...register('citizenIdentity.name', { required: true })}
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
                    renderInput={(params) => <TextField sx={{ minWidth: 300, maxWidth: 300 }} {...params} />}
                    disabled={isViewing}
                  />
                </LocalizationProvider>
              </span>
            </div>
          </div>
          <div className="flex mb-8">
            <span className="block mr-4 text-gray-400 min-w-[150px]">originAddress</span>
            <div className="flex">
              <span className="block min-w-[100px]">
                {/* <input
                  type="text"
                  className={`${isViewing ? '' : 'border'} p-2`}
                  {...register('user.fullName')}
                /> */}
                <TextField
                  sx={{ minWidth: 300, maxWidth: 300 }}
                  required
                  variant="outlined"
                  disabled={isViewing}
                  className="w-full"
                  {...register('citizenIdentity.originAddress', { required: true })}
                />
              </span>
            </div>
          </div>
          <div className="flex mb-8">
            <span className="block mr-4 text-gray-400 min-w-[150px]">residenceAddress</span>
            <div className="flex">
              <span className="block min-w-[100px]">
                {/* <input
                  type="text"
                  className={`${isViewing ? '' : 'border'} p-2`}
                  {...register('user.fullName')}
                /> */}
                <TextField
                  sx={{ minWidth: 300, maxWidth: 300 }}
                  required
                  variant="outlined"
                  disabled={isViewing}
                  className="w-full"
                  {...register('citizenIdentity.residenceAddress', { required: true })}
                />
              </span>
            </div>
          </div>
          <div className="flex mb-8">
            <span className="block mr-4 text-gray-400 min-w-[150px]">Ngày tạo</span>
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
                    value={createDate}
                    onChange={(newValue) => {
                      setCreateDate(newValue);
                    }}
                    renderInput={(params) => <TextField sx={{ minWidth: 300, maxWidth: 300 }} {...params} />}
                    disabled={isViewing}
                  />
                </LocalizationProvider>
              </span>
            </div>
          </div>
          <div className="flex mb-8">
            <span className="block mr-4 text-gray-400 min-w-[150px]">Ngày hết hạn</span>
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
                    value={expiryDate}
                    onChange={(newValue) => {
                      setExpiryDate(newValue);
                    }}
                    renderInput={(params) => <TextField sx={{ minWidth: 300, maxWidth: 300 }} {...params} />}
                    disabled={isViewing}
                  />
                </LocalizationProvider>
              </span>
            </div>
          </div>
          <div className="flex mb-8">
            <span className="block mr-4 text-gray-400 min-w-[150px]">Tạo bởi</span>
            <div className="flex">
              <span className="block min-w-[100px]">
                {/* <input
                  type="text"
                  className={`${isViewing ? '' : 'border'} p-2`}
                  {...register('user.fullName')}
                /> */}
                <TextField
                  sx={{ minWidth: 300, maxWidth: 300 }}
                  required
                  variant="outlined"
                  disabled={isViewing}
                  className="w-full"
                  {...register('citizenIdentity.createBy', { required: true })}
                />
              </span>
            </div>
          </div>
          <div className="flex mb-8">
            <span className="block mr-4 text-gray-400 min-w-[150px]">cardNumber</span>
            <div className="flex">
              <span className="block min-w-[100px]">
                {/* <input
                  type="text"
                  className={`${isViewing ? '' : 'border'} p-2`}
                  {...register('user.fullName')}
                /> */}
                <TextField
                  sx={{ minWidth: 300, maxWidth: 300 }}
                  required
                  variant="outlined"
                  disabled={isViewing}
                  className="w-full"
                  {...register('citizenIdentity.cardNumber', { required: true })}
                />
              </span>
            </div>
          </div>
          <div className="flex mb-8">
            <span className="block mr-4 text-gray-400 min-w-[150px]">Ngày hết hạn thẻ</span>
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
                    value={cardExpiryDate}
                    onChange={(newValue) => {
                      setCardExpiryDate(newValue);
                    }}
                    renderInput={(params) => <TextField sx={{ minWidth: 300, maxWidth: 300 }} {...params} />}
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

export default Identification;
