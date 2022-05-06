import { Button, Input, TextField } from '@mui/material';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import CustomModal from '../../../../components/CustomModal';
import ValidateMessage from '../../../../components/ValidateMessage';
import { createIndustry, editIndustry } from '../../../../services/api-admin.service';
import { CreateIndustryPayload, Industry } from '../../../../services/api-admin.type';

type CreateIndustryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  editRecord?: Industry;
  fetchData: () => Promise<void>;
};

const CreateIndustryModal = ({ isOpen, onClose, editRecord, fetchData }: CreateIndustryModalProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm<CreateIndustryPayload>({
    mode: 'onBlur',
    defaultValues: { industry: editRecord },
  });

  React.useEffect(() => {
    reset({ industry: editRecord });
  }, [reset, editRecord]);

  const onSubmit: SubmitHandler<CreateIndustryPayload> = async (data) => {
    try {
      console.log(data);
      let res = { data: { message: ''} };
      if (editRecord) {
        res = await editIndustry(data, data.industry.industryId);
      } else {
        res = await createIndustry(data);
      }
      toast(res.data?.message);

      fetchData();
    } catch (error: any) {
      console.log(error);
      toast(error.response.data.message);
    }
  };

  return (
    <div>
      <CustomModal
        modalTitle={`${editRecord ? 'Chỉnh sửa' : 'Thêm mới'} ngành nghề`}
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-10 mb-10">
            <div className="my-2">
              <TextField
                disabled
                label="ID"
                variant="standard"
                className="w-full"
                {...register('industry.industryId')}
              />
            </div>
            <div className="mb-2">
              <TextField
                required
                label="Tên ngành nghề"
                variant="standard"
                className="w-full"
                {...register('industry.industryName', { required: true })}
              />
              {errors?.industry?.industryName && <ValidateMessage>Trường này bắt buộc phải nhập</ValidateMessage>}
            </div>
            <div className="mb-2">
              <TextField
                label="Mã ngành nghề"
                variant="standard"
                className="w-full"
                {...register('industry.industryCode', { required: false, pattern: /^[A-Z0-9]{3,10}$/ })}
              />
              {errors?.industry?.industryCode && <ValidateMessage>Mã ngành nghề chỉ bao gồm chữ in hoa và số, từ 3-10 kí tự</ValidateMessage>}
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
