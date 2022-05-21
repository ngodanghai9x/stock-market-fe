import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import CustomModal from '../../../../components/CustomModal';
import ValidateMessage from '../../../../components/ValidateMessage';
import { RoleIdType, StatusIdType, StatusLabelType } from '../../../../constants';
import { AuthContext } from '../../../../context/auth/AuthContext';
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
  const { user } = React.useContext(AuthContext);

  React.useEffect(() => {
    reset({ industry: editRecord });
  }, [reset, editRecord]);

  const onSubmit: SubmitHandler<CreateIndustryPayload> = async (data) => {
    try {
      console.log(data);
      let res = { data: { message: '' }, status: 0 };
      if (editRecord) {
        res = await editIndustry(data, data.industry.industryId);
      } else {
        res = await createIndustry(data);
      }
      if (res.status === 200) {
        reset({ industry: {} });
        fetchData();
        onClose();
      }
      toast(res.data?.message);
    } catch (error: any) {
      toast(error?.message || error?.data.message);
    }
  };

  const disableForm = !editRecord ? false : !editRecord?.editable || editRecord?.statusId !== StatusIdType.pending;

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
            {editRecord && (
              <div className="my-2">
                <TextField
                  disabled
                  label="ID"
                  variant="standard"
                  className="w-full"
                  {...register('industry.industryId')}
                />
              </div>
            )}
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
              {errors?.industry?.industryCode && (
                <ValidateMessage>Mã ngành nghề chỉ bao gồm chữ in hoa và số, từ 3-10 kí tự</ValidateMessage>
              )}
            </div>
            <div className="mb-2">
              <TextField
                label="Mô tả"
                variant="standard"
                className="w-full"
                {...register('industry.description', { required: false })}
              />
            </div>
            {user.roleId === RoleIdType.admin && (
              <>
                <div className="mb-2">
                  <FormControl variant="standard" className="w-full">
                    <InputLabel id="industry.statusId">Trạng thái</InputLabel>
                    <Select
                      variant="standard"
                      labelId="industry.statusId"
                      {...register('industry.statusId', { required: true, valueAsNumber: true })}
                      defaultValue={getValues('industry.statusId')}
                      label="Trạng thái"
                    >
                      {Object.keys(StatusLabelType).map((id) => {
                        return <MenuItem value={+id}>{StatusLabelType[id]}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>
                  {errors?.industry?.statusId && <ValidateMessage>Trường này bắt buộc phải nhập</ValidateMessage>}
                </div>
              </>
            )}
          </div>
          <div className="flex justify-end px-6 pb-6">
            <div className="mr-3">
              <Button type="button" variant="outlined" onClick={onClose}>
                Hủy
              </Button>
            </div>
            <Button disabled={disableForm} type="submit" variant="contained">
              Lưu
            </Button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
};

export default CreateIndustryModal;
