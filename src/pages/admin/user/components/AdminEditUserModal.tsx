import { Autocomplete, Button, Input, TextField } from '@mui/material';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import CustomModal from '../../../../components/CustomModal';
import ValidateMessage from '../../../../components/ValidateMessage';
import { RoleLabelType, StatusLabelType } from '../../../../constants';
import { editUserByAdmin } from '../../../../services/api-admin.service';
import { AdminEditUserPayload, User } from '../../../../services/api-admin.type';

type AdminEditUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  editRecord?: User;
};

const AdminEditUserModal = ({ isOpen, onClose, editRecord }: AdminEditUserModalProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm<AdminEditUserPayload>({
    mode: 'onBlur',
    defaultValues: { user: editRecord },
  });

  React.useEffect(() => {
    reset({ user: editRecord });
  }, [reset, editRecord]);

  const onSubmit: SubmitHandler<AdminEditUserPayload> = async (data) => {
    try {
      console.log(data);
      await editUserByAdmin(data, data.user.userId);
    } catch (error: any) {
      console.log(error);
      toast(error.response.data.message);
    }
  };
  return (
    <div>
      <CustomModal
        modalTitle="Thông tin người dùng"
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-10 mb-10">
            <div className="my-2">
              <TextField disabled label="ID" variant="standard" className="w-full" {...register('user.userId')} />
            </div>
            <div className="mb-2">
              <TextField
                disabled
                label="Tài khoản"
                variant="standard"
                className="w-full"
                {...register('user.username')}
              />
            </div>
            <div className="mb-2">
              <TextField
                disabled
                label="Họ và tên"
                variant="standard"
                className="w-full"
                {...register('user.fullName')}
              />
            </div>
            <div className="mb-2">
              <TextField
                required
                label="Vai trò"
                variant="standard"
                className="w-full"
                {...register('user.roleId', { required: true })}
              />
              {errors?.user?.roleId && <ValidateMessage>Trường này bắt buộc phải nhập</ValidateMessage>}
            </div>
            <div className="mb-2">
              <TextField
                required
                label="Trạng thái"
                variant="standard"
                className="w-full"
                {...register('user.userStatus', { required: true })}
              />
              {errors?.user?.userStatus && <ValidateMessage>Trường này bắt buộc phải nhập</ValidateMessage>}
            </div>
            {/* <div className="mb-2">
              <Autocomplete
                freeSolo
                disableClearable
                options={Object.values(StatusLabelType)}
                renderInput={(params) => (
                  <div className="">
                    <TextField
                      {...params}
                      required
                      label="Vai trò"
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
            <div className="mb-2">
              <Autocomplete
                freeSolo
                disableClearable
                options={Object.values(RoleLabelType)}
                renderInput={(params) => (
                  <div className="">
                    <TextField
                      {...params}
                      required
                      label="Trạng thái"
                      variant="standard"
                      InputProps={{
                        ...params.InputProps,
                        type: 'search',
                      }}
                    />
                  </div>
                )}
              />
            </div> */}
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

export default AdminEditUserModal;
