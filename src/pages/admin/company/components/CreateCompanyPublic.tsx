import { Autocomplete, Button, Checkbox, Divider, Input, TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import CustomModal from '../../../../components/CustomModal';
import { Company, CreateCompanyPayload, Industry } from '../../../../services/api-admin.type';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useEffect, useState } from 'react';
import { createCompanyNoAuth, getAllIndustry } from '../../../../services/api-admin.service';
import ValidateMessage from '../../../../components/ValidateMessage';

type CreateCompanyPublicProps = {};

const CreateCompanyPublic = ({}: CreateCompanyPublicProps) => {
  const [ipoDate, setIpoDate] = useState<Date | null>(null);
  const [foundedDate, setFoundedDate] = useState<Date | null>(null);
  const [industries, setIndustries] = useState<Industry[]>([]);

  const listIndustry = new Map<string, number>(
    industries.map((el) => {
      return [el.industryName, el.industryId];
    })
  );

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm<CreateCompanyPayload>({
    mode: 'onBlur',
    defaultValues: {
      company: {
        ipoDate: new Date(),
      },
      isIpo: true,
    },
  });

  const resetForm = () => {
    reset({
      company: {
        ipoDate: new Date(),
      },
      isIpo: true,
    });
  };

  const onSubmit: SubmitHandler<CreateCompanyPayload> = async (data) => {
    try {
      const formData = {
        ...data,
        needChangePw: false,
        // account: {
        //   ...data.account,
        //   username: data.company.companyName,
        // },
        company: {
          ...data.company,
          industryId: listIndustry.get(getValues('company.industryId').toString()) || 0,
        },
      };
      const res = await createCompanyNoAuth(formData);
      if (res.status === 200) {
        resetForm();
      }

      toast(res.data?.message);
    } catch (error: any) {
      console.log(error);
      toast(error.response.data.message);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const res = await getAllIndustry();
      setIndustries(res as Industry[]);
    };
    getData();
  }, []);

  React.useEffect(() => {
    reset({
      company: {
        ipoDate: new Date(),
      },
      isIpo: true,
    });
  }, [reset]);

  return (
    <div className="mx-20 mt-2">
      <Typography align="center" variant="h4">
        Đăng ký niêm yết công ty
      </Typography>
      <Divider className="my-2" />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <>
              <p className="mt-2 font-medium">Tài khoản: </p>
              <div className="grid grid-cols-2 gap-0 ml-[-0.5rem] mr-[-0.5rem]">
                <div className="my-1 mx-2">
                  <TextField
                    id="account-username"
                    required
                    label="Tài khoản"
                    variant="standard"
                    className="w-full"
                    {...register('account.username', { required: true })}
                  />
                  {errors?.account?.username && <ValidateMessage>Trường này bắt buộc phải nhập</ValidateMessage>}
                </div>
                <div className="my-1 mx-2">
                  <TextField
                    id="account-password"
                    type="password"
                    required
                    label="Mật khẩu"
                    variant="standard"
                    className="w-full"
                    {...register('account.password', { required: true })}
                  />
                  {errors?.account?.password && <ValidateMessage>Trường này bắt buộc phải nhập</ValidateMessage>}
                </div>
              </div>
            </>
            <p className="mt-2 font-medium">Công ty: </p>
            <div className="grid grid-cols-2 gap-0 ml-[-0.5rem] mr-[-0.5rem]">
              <div className="my-1 mx-2">
                <TextField
                  id="company-name"
                  required
                  label="Tên công ty"
                  variant="standard"
                  className="w-full"
                  {...register('company.companyName', { required: true })}
                />
                {errors?.company?.companyName && <ValidateMessage>Trường này bắt buộc phải nhập</ValidateMessage>}
              </div>
              <div className="my-1 mx-2">
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  options={industries.map((option) => option.industryName)}
                  renderInput={(params) => (
                    <div className="">
                      <TextField
                        {...params}
                        {...register('company.industryId')}
                        required
                        label="Ngành nghề"
                        variant="standard"
                        InputProps={{
                          ...params.InputProps,
                          type: 'search',
                        }}
                      />
                      {errors?.company?.industryId && <ValidateMessage>Trường này bắt buộc phải nhập</ValidateMessage>}
                    </div>
                  )}
                />
              </div>
              <div className="my-1 mx-2">
                <TextField
                  id="contact-email"
                  required
                  label="Email"
                  variant="standard"
                  className="w-full"
                  {...register('company.contactEmail', { required: true })}
                />
                {errors?.company?.contactEmail && <ValidateMessage>Trường này bắt buộc phải nhập</ValidateMessage>}
              </div>
              <div className="my-1 mx-2">
                <TextField
                  id="website-url"
                  label="Website"
                  variant="standard"
                  className="w-full"
                  {...register('company.websiteUrl', { required: false })}
                />
                {errors?.company?.websiteUrl && <ValidateMessage>Trường này bắt buộc phải nhập</ValidateMessage>}
              </div>
              <div className="my-1 mx-2">
                <TextField
                  id="phone-number"
                  label="Số điện thoại"
                  variant="standard"
                  className="w-full"
                  {...register('company.phoneNumber', { required: false })}
                />
                {errors?.company?.phoneNumber && <ValidateMessage>Trường này bắt buộc phải nhập</ValidateMessage>}
              </div>
              <div className="my-1 mx-2">
                <TextField
                  id="number-employees"
                  label="Số lượng nhân viên"
                  variant="standard"
                  className="w-full"
                  {...register('company.numEmployees', { required: false, valueAsNumber: true })}
                />
                {errors?.company?.numEmployees && <ValidateMessage>Trường này bắt buộc phải nhập</ValidateMessage>}
              </div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  orientation="portrait"
                  label="Ngày thành lập"
                  inputFormat="MM/dd/yyyy"
                  value={foundedDate}
                  className="w-full"
                  onChange={(newValue) => {
                    setFoundedDate(newValue);
                  }}
                  renderInput={(params) => (
                    <div className="my-1 mx-2">
                      <TextField variant="standard" className="w-full" {...params} />
                      {errors?.company?.foundedDate && <ValidateMessage>Trường này bắt buộc phải nhập</ValidateMessage>}
                    </div>
                  )}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  orientation="portrait"
                  label="Ngày niêm yết"
                  inputFormat="MM/dd/yyyy"
                  value={ipoDate}
                  className="w-full"
                  onChange={(newValue) => {
                    setIpoDate(newValue);
                  }}
                  disabled={getValues().isIpo}
                  renderInput={(params) => (
                    <div className="my-1 mx-2">
                      <TextField variant="standard" className="w-full" {...params} />
                      {errors?.company?.ipoDate && <ValidateMessage>Trường này bắt buộc phải nhập</ValidateMessage>}
                    </div>
                  )}
                />
              </LocalizationProvider>
            </div>
            <>
              <p className="mt-2 font-medium">Cố phiếu: </p>
              <div className="my-2">
                <TextField
                  id="stock-symbol"
                  required
                  label="Mã cổ phiếu"
                  variant="standard"
                  className="w-full"
                  {...register('stock.stockSymbol', { required: true })}
                />
                {errors?.stock?.stockSymbol && <ValidateMessage>Trường này bắt buộc phải nhập</ValidateMessage>}
              </div>
              <div className="mb-2">
                <TextField
                  id="quantity"
                  required
                  label="Số lượng cổ phiếu"
                  variant="standard"
                  className="w-full"
                  type="number"
                  {...register('stock.quantity', { required: true, valueAsNumber: true })}
                />
                {errors?.stock?.quantity && <ValidateMessage>Trường này bắt buộc phải nhập</ValidateMessage>}
              </div>
              <div className="mb-2">
                <TextField
                  id="price"
                  required
                  label="Giá cổ phiếu"
                  variant="standard"
                  className="w-full"
                  type="number"
                  {...register('stock.price', { required: true, valueAsNumber: true })}
                />
                {errors?.stock?.price && <ValidateMessage>Trường này bắt buộc phải nhập</ValidateMessage>}
              </div>
              <div className="flex -ml-3">
                <Checkbox
                  id="isIpo"
                  {...register('isIpo')}
                  checked={getValues('isIpo')}
                  onClick={() => {
                    setIpoDate(new Date());
                  }}
                />
                <label className="mt-2 cursor-pointer select-none" htmlFor="isIpo">
                  Niêm yết ngay
                </label>
              </div>
            </>
          </div>
          <div className="flex justify-end px-6 pb-6">
            <div className="mr-3">
              <Button type="button" variant="outlined" className="mr-3" onClick={resetForm}>
                Hủy
              </Button>
            </div>
            <Button type="submit" variant="contained">
              Lưu
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCompanyPublic;