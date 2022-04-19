import { Autocomplete, Button, Checkbox, Input, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import CustomModal from '../../../../components/CustomModal';
import { Company, CreateCompanyPayload, Industry } from '../../../../services/api-admin.type';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useEffect, useState } from 'react';
import { createCompany, editCompany, getAllIndustry } from '../../../../services/api-admin.service';
import ValidateMessage from '../../../../components/ValidateMessage';

type CreateCompanyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  editRecord?: Company;
  fetchData: () => Promise<void>;
};

const CreateCompanyModal = ({ isOpen, onClose, editRecord, fetchData }: CreateCompanyModalProps) => {
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
      company: editRecord || {
        ipoDate: new Date(),
      },
      isIpo: true,
    },
  });

  const onSubmit: SubmitHandler<CreateCompanyPayload> = async (data) => {
    try {
      const formData = {
        ...data,
        account: {
          username: data.company.companyName,
        },
        company: {
          ...data.company,
          industryId: listIndustry.get(getValues('company.industryId').toString()) || 0,
        },
      };
      let res = { data: { message: '' } };

      if (editRecord) {
        res = await editCompany(formData, formData.company.companyId);
      } else {
        res = await createCompany(formData);
      }
      toast(res.data?.message);
      fetchData();
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
      company: editRecord || {
        ipoDate: new Date(),
      },
      isIpo: true,
    });
  }, [reset, editRecord]);

  return (
    <div>
      <CustomModal
        modalTitle={`${editRecord ? 'Chỉnh sửa' : 'Thêm mới'} công ty`}
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-10 mb-10">
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
                  disableClearable
                  options={industries.map((option) => option.industryName)}
                  renderInput={(params) => (
                    <div className="">
                      <TextField
                        {...params}
                        {...register('company.industryId', { valueAsNumber: true })}
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
                  {...register('company.contactEmail', {
                    required: true,
                    pattern: /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/i,
                    // /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
                {errors?.company?.contactEmail && <ValidateMessage>Email không đúng định dạng</ValidateMessage>}
              </div>
              <div className="my-1 mx-2">
                <TextField
                  id="website-url"
                  label="Website"
                  variant="standard"
                  className="w-full"
                  {...register('company.websiteUrl', {
                    required: false,
                    pattern:
                      /^((http:|https:|http:|https:)\/\/(www\.)?)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,255}(:[0-9]{1,5})?(\/.*)?$/i,
                  })}
                />
                {errors?.company?.websiteUrl && <ValidateMessage>URL không đúng định dạng</ValidateMessage>}
              </div>
              <div className="my-1 mx-2">
                <TextField
                  id="phone-number"
                  label="Số điện thoại"
                  variant="standard"
                  className="w-full"
                  {...register('company.phoneNumber', {
                    required: false,
                    maxLength: 10,
                    minLength: 10,
                    pattern: /^((09|03|07|08|05)+([0-9]{8})\b)$/,
                  })}
                />
                {errors?.company?.phoneNumber && <ValidateMessage>Số điện thoại không đúng định dạng</ValidateMessage>}
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
            {!editRecord && (
              <>
                <p className="mt-2 font-medium">Cố phiếu: </p>
                <div className="my-2">
                  <TextField
                    id="stock-symbol"
                    required
                    label="Mã cổ phiếu"
                    variant="standard"
                    className="w-full"
                    {...register('stock.stockSymbol', { required: true, pattern: /^[A-Z]{3,5}$/ })}
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
                <div className="flex -ml-3">
                  <Checkbox id="newChangePW" {...register('needChangePw')} />
                  <label className="mt-2 cursor-pointer select-none" htmlFor="newChangePW">
                    Cần thay đổi mật khẩu
                  </label>
                </div>
              </>
            )}
          </div>
          <div className="flex justify-end px-6 pb-6">
            <div className="mr-3">
              <Button type="button" variant="outlined" className="mr-3" onClick={onClose}>
                Hủy
              </Button>
            </div>
            <Button type="submit" variant="contained">
              Lưu
            </Button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
};

export default CreateCompanyModal;
