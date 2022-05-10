import { Autocomplete, Button, FormControl, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import CustomModal from '../../../../components/CustomModal';
import ValidateMessage from '../../../../components/ValidateMessage';
import { RoleLabelType, StatusLabelType, UserStatusLabel } from '../../../../constants';
import { editUserByAdmin } from '../../../../services/api-admin.service';
import { AdminEditUserPayload, User } from '../../../../services/api-admin.type';

type AdminEditUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  editRecord?: User;
  fetchData: () => Promise<void>;
};

const AdminEditUserModal = ({ isOpen, onClose, editRecord, fetchData }: AdminEditUserModalProps) => {
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
      const res = await editUserByAdmin(data, data.user.userId);
      toast(res.data?.message);
      fetchData();
    } catch (error: any) {
      toast(error?.message || error?.data.message);
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
              <FormControl variant="standard" className="w-full">
                <InputLabel id="demo-simple-select-standard-label">Vai trò</InputLabel>
                <Select
                  variant="standard"
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  {...register('user.roleId', { required: true, valueAsNumber: true })}
                  label="Vai trò"
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </FormControl>
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
                options={Object.keys(StatusLabelType)}
                renderInput={(params) => (
                  <div className="">
                    <TextField
                      {...params}
                      required
                      label="Vai trò"
                      variant="standard"
                      {...register('user.roleId', { required: true })}
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
                options={Object.keys(UserStatusLabel)}
                renderInput={(params) => (
                  <div className="">
                    <TextField
                      {...params}
                      {...register('user.userStatus', { required: true })}
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
