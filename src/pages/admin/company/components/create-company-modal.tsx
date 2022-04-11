import { Button, Input, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import CustomModal from '../../../../components/modal';
import { CreateCompanyPayload } from '../../../../services/api-admin.type';

type CreateCompanyModalProps = {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCompanyModal = ({ isOpen, onClose }: CreateCompanyModalProps) => {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<CreateCompanyPayload>()
  const onSubmit: SubmitHandler<CreateCompanyPayload> = async (data) => {
    try {
      console.log(data)
    } catch (error: any) {
      console.log(error)
      toast(error.response.data.message)
    }
  }
  return (
    <div>
      <CustomModal
        modalTitle='Create company'
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mx-10 mb-10'>
            <p className='mt-2 font-medium'>Account: </p>
            <TextField id="standard-basic" label="Username" variant="standard" className='w-full'  {...register('account.username', { required: true })} />
            <TextField id="standard-basic" label="Password" variant="standard" className='w-full'  {...register('account.password', { required: true })} />
            <p className='mt-2 font-medium'>Company: </p>
            <TextField id="standard-basic" label="Company name" variant="standard" className='w-full'   {...register('company.companyName', { required: true })} />
            <TextField id="standard-basic" label="Website url" variant="standard" className='w-full'  {...register('company.websiteUrl', { required: true })} />
            <TextField id="standard-basic" label="Contact email" variant="standard" className='w-full'  {...register('company.contactEmail', { required: true })} />
            <TextField id="standard-basic" label="Phone number" variant="standard" className='w-full'  {...register('company.phoneNumber', { required: true })} />
            <TextField id="standard-basic" label="Number employees" variant="standard" className='w-full'  {...register('company.numEmployees', { required: true })} />
            <p className='mt-2 font-medium'>Stock: </p>
            <TextField id="standard-basic" label="Stock symbol" variant="standard" className='w-full'  {...register('stock.stockSymbol', { required: true })} />
            <TextField id="standard-basic" label="Quantity" variant="standard" className='w-full' {...register('stock.quantity', { required: true })} />
            <TextField id="standard-basic" label="Price" variant="standard" className='w-full' {...register('stock.price', { required: true })} />
          </div>
          <div className='flex justify-end px-6 pb-6'>
            <Button type='submit' variant='contained' > Create company </Button>
          </div>
        </form>
      </CustomModal>
    </div>
  )
}

export default CreateCompanyModal