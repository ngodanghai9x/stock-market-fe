import { Button, Input, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import CustomModal from '../../../../components/CustomModal';
import { CreateCompanyPayload } from '../../../../services/api-admin.type';

type CreateIndustryModalProps = {
  isOpen: boolean;
  onClose: () => void;
}

const CreateIndustryModal = ({ isOpen, onClose }: CreateIndustryModalProps) => {
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
        modalTitle='Thêm mới ngành nghề'
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mx-10 mb-10'>
            <TextField id="standard-basic" label="Company name" variant="standard" className='w-full'   {...register('company.companyName', { required: true })} />
            <TextField id="standard-basic" label="Website url" variant="standard" className='w-full'  {...register('company.websiteUrl', { required: true })} />
            <TextField id="standard-basic" label="Contact email" variant="standard" className='w-full'  {...register('company.contactEmail', { required: true })} />
            <TextField id="standard-basic" label="Phone number" variant="standard" className='w-full'  {...register('company.phoneNumber', { required: true })} />
            <TextField id="standard-basic" label="Number employees" variant="standard" className='w-full'  {...register('company.numEmployees', { required: true })} />
          </div>
          <div className='flex justify-end px-6 pb-6'>
            <Button type='button' variant='contained' > Hủy </Button>
            <Button type='submit' variant='contained' > Lưu </Button>
          </div>
        </form>
      </CustomModal>
    </div>
  )
}

export default CreateIndustryModal