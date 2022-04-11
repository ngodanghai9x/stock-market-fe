import { Autocomplete, Button, Checkbox, Input, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import CustomModal from '../../../../components/CustomModal';
import { CreateCompanyPayload, Industry } from '../../../../services/api-admin.type';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useEffect, useState } from 'react';
import { getAllIndustry } from '../../../../services/api-admin.service';

type CreateCompanyModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateCompanyModal = ({ isOpen, onClose }: CreateCompanyModalProps) => {
  const [ipoDate, setIpoDate] = useState<Date | null>(null);
  const [foundedDate, setFoundedDate] = useState<Date | null>(null);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CreateCompanyPayload>();
  const onSubmit: SubmitHandler<CreateCompanyPayload> = async (data) => {
    try {
      console.log(data);
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

  return (
    <div>
      <CustomModal
        modalTitle="Thêm mới công ty"
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
                        required
                        label="Ngành nghề"
                        variant="standard"
                        InputProps={{
                          ...params.InputProps,
                          type: 'search',
                        }}
                      />
                    </div>
                  )}
                />
              </div>
              <div className="my-1 mx-2">
                <TextField
                  id="website-url"
                  required
                  label="Website"
                  variant="standard"
                  className="w-full"
                  {...register('company.websiteUrl', { required: false })}
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
              </div>
              <div className="my-1 mx-2">
                <TextField
                  id="phone-number"
                  label="Số điện thoại"
                  variant="standard"
                  className="w-full"
                  {...register('company.phoneNumber', { required: false })}
                />
              </div>
              <div className="my-1 mx-2">
                <TextField
                  id="number-employees"
                  label="Số lượng nhân viên"
                  variant="standard"
                  className="w-full"
                  {...register('company.numEmployees', { required: false })}
                />
              </div>
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
                  renderInput={(params) => (
                    <div className="my-1 mx-2">
                      <TextField variant="standard" className="w-full" {...params} />
                    </div>
                  )}
                />
              </LocalizationProvider>
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
                    </div>
                  )}
                />
              </LocalizationProvider>
            </div>
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
            </div>
            <div className="mb-2">
              <TextField
                id="quantity"
                required
                label="Số lượng cổ phiếu"
                variant="standard"
                className="w-full"
                {...register('stock.quantity', { required: true })}
              />
            </div>
            <div className="mb-2">
              <TextField
                id="price"
                required
                label="Giá cổ phiếu"
                variant="standard"
                className="w-full"
                {...register('stock.price', { required: true })}
              />
            </div>
            <div className="flex -ml-3">
              <Checkbox id="isIpo" {...register('isIpo')} />
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
