import { Button, Input, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import CustomModal from '../../../../components/CustomModal';
import { CreateIndustryPayload } from '../../../../services/api-admin.type';

type CreateIndustryModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateIndustryModal = ({ isOpen, onClose }: CreateIndustryModalProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CreateIndustryPayload>();
  const onSubmit: SubmitHandler<CreateIndustryPayload> = async (data) => {
    try {
      console.log(data);
    } catch (error: any) {
      console.log(error);
      toast(error.response.data.message);
    }
  };
  return (
    <div>
      <CustomModal
        modalTitle="Thêm mới ngành nghề"
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-10 mb-10">
            <div className="my-2">
              <TextField
                required
                label="Tên ngành nghề"
                variant="standard"
                className="w-full"
                {...register('industry.industryName', { required: true })}
              />
            </div>
            <div className="mb-2">
              <TextField
                required
                label="Mã ngành nghề"
                variant="standard"
                className="w-full"
                {...register('industry.industryCode', { required: true })}
              />
            </div>
            <div className="mb-2">
              <TextField
                label="Mô tả"
                variant="standard"
                className="w-full"
                {...register('industry.description', { required: false })}
              />
            </div>
          </div>
          <div className="flex justify-end px-6 pb-6">
            <div className="mr-3">
              <Button type="button" variant="outlined" onClick={onClose}>
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

export default CreateIndustryModal;
