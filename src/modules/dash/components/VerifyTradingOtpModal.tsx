import { Autocomplete, Button, Input, TextField } from '@mui/material';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import CustomModal from '../../../components/CustomModal';
import ValidateMessage from '../../../components/ValidateMessage';
import { verifyTradingOtp } from '../../../services/api-auth.service';
import { MyResponse } from '../../../types';
// import CustomModal from '../../../../components/CustomModal';
// import ValidateMessage from '../../../../components/ValidateMessage';

type VerifyTradingOtpModalProps = {
  isOpen: boolean;
  onClose: () => void;
  fetchOTP: () => Promise<MyResponse<any>>;
};
type FormType = {
  otpTrading: string;
};

const VerifyTradingOtpModal = ({ isOpen, onClose, fetchOTP }: VerifyTradingOtpModalProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    mode: 'onBlur',
    // defaultValues: { otpTrading: '' },
  });

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    try {
      console.log(data);
      const res = await verifyTradingOtp(data.otpTrading);
      if (res.status === 200) {
        onClose();
        toast('Xác nhận mã OTP thành công');
      }
    } catch (error: any) {
      toast(error?.message || error?.data.message);
    }
  };
  return (
    <div>
      <CustomModal
        modalTitle="Xác nhận mã OTP"
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-10 mb-10">
            <div className="my-2">
              <TextField
                label="Mã OTP"
                // required
                variant="standard"
                className="w-full"
                {...register('otpTrading', { required: true })}
              />
              {errors.otpTrading && <ValidateMessage>Trường này bắt buộc phải nhập</ValidateMessage>}
            </div>
          </div>

          <div className="flex justify-end px-6 pb-6">
            <div className="mr-3">
              <Button type="button" variant="outlined" onClick={onClose}>
                Hủy
              </Button>
            </div>
            <div className="mr-3">
              <Button type="button" variant="outlined" onClick={fetchOTP}>
                Lấy mã OTP
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

export default VerifyTradingOtpModal;
