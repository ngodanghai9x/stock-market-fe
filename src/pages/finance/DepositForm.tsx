import { Autocomplete, Button, TextField } from '@mui/material';
import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ValidateMessage from '../../components/ValidateMessage';
import { BANKS, OPTIONS_NUMBER } from '../../constants';
import { createDeposit } from '../../services/api-user.service';
import { CreateDepositPayload } from '../../services/api-user.type';

const DepositForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm<CreateDepositPayload>({
    mode: 'onBlur',
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<CreateDepositPayload> = async (data) => {
    try {
      let res = await createDeposit(data);
      toast(res.message);
    } catch (error: any) {
      toast(error?.message || error?.data.message);
    }
  };

  return (
    <div className="bg-gray-100 h-screen w-full mx-auto py-20">
      <div className="w-1/2 bg-white rounded-tr-2xl rounded-br-2xl shadow-2xl mx-auto px-10 py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="mx-10 mb-4">
          <p className="mb-8 font-bold text-center text-lg">Nạp tiền </p>
          <div className="flex flex-col gap-4">
            <TextField
              id="company-name"
              required
              label="Số tài khoản"
              variant="standard"
              className="w-full"
              {...register('bankNumber', { required: true })}
            />
            {errors?.bankNumber && <ValidateMessage>Trường này bắt buộc phải nhập</ValidateMessage>}
            <Autocomplete
              freeSolo
              disableClearable
              options={BANKS}
              renderInput={(params) => (
                <div className="">
                  <TextField
                    {...params}
                    {...register('bankName')}
                    required
                    label="Tên ngân hàng"
                    variant="standard"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                  />
                  {errors?.bankName && <ValidateMessage>Trường này bắt buộc phải nhập</ValidateMessage>}
                </div>
              )}
            />
            <TextField
              id="company-name"
              required
              label="Tiền"
              variant="standard"
              className="w-full"
              {...register('money', { required: true, ...OPTIONS_NUMBER })}
            />
            {errors?.money && (
              <ValidateMessage>{errors?.money.message || `Trường này bắt buộc phải nhập`}</ValidateMessage>
            )}
            <TextField
              id="company-name"
              label="Ghi chú"
              variant="standard"
              className="w-full"
              {...register('message')}
            />
            <div className="mt-5">
              <Button type="submit" variant="contained" sx={{ width: '100%' }}>
                Xác nhận
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepositForm;
