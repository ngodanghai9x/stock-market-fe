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
}

const CreateCompanyModal = ({ isOpen, onClose }: CreateCompanyModalProps) => {
  const [ipoDate, setIpoDate] = useState<Date | null>(null);
  const [dateOfincorporation, setDateOfincorporation] = useState<Date | null>(null);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<CreateCompanyPayload>()
  const onSubmit: SubmitHandler<CreateCompanyPayload> = async (data) => {
    try {
      console.log(data)
    } catch (error: any) {
      console.log(error)
      toast(error.response.data.message)
    }
  }

  useEffect(() => {
    const getData = async () => {
      const res = await getAllIndustry();
      setIndustries(res as Industry[]);
    }
    getData()
  }, [])

  return (
    <div>
      <CustomModal
        modalTitle='Thêm mới công ty'
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mx-10 mb-10'>
            <p className='mt-2 font-medium'>Công ty: </p>
            <div className='my-3'>
              <TextField id="company-name" label="Company name" variant="standard" className='w-full'   {...register('company.companyName', { required: true })} />
            </div>
            <div className='mb-3'>
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={industries.map((option) => option.industryName)}
                renderInput={(params) => (
                  <div className='my-3'>
                    <TextField
                      {...params}
                      label="Mã ngành công nhiệp"
                      variant='standard'
                      InputProps={{
                        ...params.InputProps,
                        type: 'search',
                      }}
                    />
                  </div>
                )}
              />
            </div>
            <div className='mb-3'>
              <TextField id="website-url" label="Website url" variant="standard" className='w-full'  {...register('company.websiteUrl', { required: true })} />
            </div>
            <div className='mb-3'>
              <TextField id="contact-email" label="Contact email" variant="standard" className='w-full'  {...register('company.contactEmail', { required: true })} />
            </div>
            <div className='mb-3'>
              <TextField id="phone-number" label="Phone number" variant="standard" className='w-full'  {...register('company.phoneNumber', { required: true })} />
            </div>
            <div className='mb-3'>
              <TextField id="number-employees" label="Number employees" variant="standard" className='w-full'  {...register('company.numEmployees', { required: true })} />
            </div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                orientation='portrait'
                label="Ngày niêm yết"
                inputFormat="MM/dd/yyyy"
                value={ipoDate}
                className="w-full"
                onChange={(newValue) => {
                  setIpoDate(newValue);
                }}
                renderInput={(params) => <div className='my-3'><TextField variant='standard' className='w-full' {...params} /></div>}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                orientation='portrait'
                label="Ngày thành lập"
                inputFormat="MM/dd/yyyy"
                value={dateOfincorporation}
                className="w-full"
                onChange={(newValue) => {
                  setDateOfincorporation(newValue);
                }}
                renderInput={(params) => <div className='my-3'><TextField variant='standard' className='w-full' {...params} /></div>}
              />
            </LocalizationProvider>
            <p className='mt-2 font-medium'>Cố phiếu: </p>
            <div className='my-3'>
              <TextField id="stock-symbol" label="Stock symbol" variant="standard" className='w-full'  {...register('stock.stockSymbol', { required: true })} />
            </div>
            <div className='mb-3'>
              <TextField id="quantity" label="Quantity" variant="standard" className='w-full' {...register('stock.quantity', { required: true })} />
            </div>
            <div className='mb-3'>
              <TextField id="price" label="Price" variant="standard" className='w-full' {...register('stock.price', { required: true })} />
            </div>
            <div className='flex -ml-3'>
              <Checkbox id='isIpo'  {...register('isIpo')} />
              <label className='mt-2 font-medium cursor-pointer select-none' htmlFor='isIpo'>Đã niêm yết</label>
            </div>
            <div className='flex -ml-3'>
              <Checkbox id="newChangePW"  {...register('needChangePw')} />
              <label className='mt-2 font-medium cursor-pointer select-none' htmlFor='newChangePW'>Cần thay đổi mật khẩu</label>
            </div>
          </div>
          <div className='flex justify-end px-6 pb-6'>
            <div className='mr-3'>
              <Button type='button' variant='contained' className='mr-3' onClick={onClose} > Hủy </Button>
            </div>
            <Button type='submit' variant='contained' > Lưu </Button>
          </div>
        </form>
      </CustomModal>
    </div>
  )
}

export default CreateCompanyModal