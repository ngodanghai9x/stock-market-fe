import React, { useState } from 'react';
import { CreateStockOrder, PriceItem } from '../../../services/api-user.type';
import { formatAmount, formatPrice, isFloat, numberWithCommas } from '../../../lib/utils';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AppContext } from '../../../context';
import { STORAGE } from '../../../constants';
import { toast } from 'react-toastify';
import { createStockOrder } from '../../../services/api-user.service';
import VerifyTradingOtpModal from './VerifyTradingOtpModal';
import { getTradingOtp } from '../../../services/api-auth.service';

type TStockOrder = Pick<CreateStockOrder, 'price' | 'quantity'>;

const CssTextField = styled(TextField)({
  '& label': {
    color: 'white',
  },
  '& .MuiOutlinedInput-input': {
    color: 'white',
  },
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
});

const PriceTableHeader = ({ currentStock }: { currentStock: PriceItem }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<TStockOrder>({
    // reValidateMode: 'onBlur',
    mode: 'onBlur',
    defaultValues: {
      quantity: 0,
      price: currentStock.refPrice / 1000 || 0,
    },
  });

  const {
    userInfo: { user, citizenIdentity, storage },
  } = React.useContext(AppContext);

  const [orderValue, setOrderValue] = useState<number>(0);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  React.useEffect(() => {
    reset({
      quantity: 0,
      price: currentStock.refPrice / 1000 || 0,
    });
  }, [reset, currentStock]);

  React.useEffect(() => {
    const subscription = watch(({ quantity, price }) => {
      if (quantity && price) setOrderValue(quantity * price * 1000);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const fetchOTP = async () => {
    return await getTradingOtp();
  };

  // Type: SubmitHandler<TStockOrder>
  const handleCreateOrder = async (data: TStockOrder, isBuy: boolean) => {
    const maxQuantity = storage[currentStock.symbol]?.quantity || 0;
    const otpTrading = localStorage.getItem(STORAGE.otpTrading) || '';
    if (!citizenIdentity) {
      // alert(`Bạn cần phải xác minh danh tính trước khi giao dịch cổ phiếu`);
      toast(`Bạn cần phải xác minh danh tính trước khi giao dịch cổ phiếu`);
      return;
    }
    if (!otpTrading) {
      setIsOpenModal(true);
      fetchOTP();
      return;
    }
    const realPrice = data.price * 1000;
    if (!realPrice || !data.quantity || isFloat(realPrice) || isFloat(data.quantity) || data.quantity % 100 !== 0) {
      toast(`Giá đặt mua/bán phải là số nguyên dương, số lượng cổ phiếu phải là bội của 100`);
      return;
    }
    if (realPrice > currentStock.ceilPrice || realPrice < currentStock.floorPrice) {
      toast(`Giá đặt mua/bán phải nằm trong khoảng giá trần - giá sàn`);
      return;
    }
    if (!isBuy && data.quantity > maxQuantity) {
      toast(`Không thể bán số lượng cổ phiếu lớn hơn số lượng hiện có`);
      return;
    }
    if (isBuy && user.money < realPrice * data.quantity * 1.01) {
      toast(`Không đủ số dư`);
      return;
    }
    const order: CreateStockOrder = {
      ...data,
      price: realPrice,
      isBuy,
      stockSymbol: currentStock.symbol,
      orderTypeId: 1,
      userId: user.userId,
    };
    const res = await createStockOrder({ order, otpTrading });
    toast(res?.message);
  };

  return (
    <div className="text-white bg-trueGray-900">
      <div className="flex p-4 items-center justify-between">
        <div className="flex items-center">
          <CssTextField
            sx={{ maxWidth: 160, minWidth: 160, opacity: '70%' }}
            value={currentStock.symbol || ''}
            InputProps={{
              readOnly: true,
            }}
          />
          <div className="">
            {/* <FormControl fullWidth>
            <InputLabel>TK</InputLabel>
            <Select
              value={account}
              label="TK"
              onChange={handleChange}
            >
              <MenuItem>Thường</MenuItem>
            </Select>
          </FormControl> */}
          </div>
          <div className="flex flex-col mx-6">
            <span>Sức mua</span>
            <span>{numberWithCommas(user.money)}</span>
          </div>
          <div className="flex flex-col mx-6">
            <span>Ký quỹ</span>
            <span>0%</span>
          </div>
          <div className="mx-6">
            <form
              // onSubmit={handleSubmit(submitForm)}
              className="w-ful flex"
            >
              <div className="flex items-center">
                <button
                  className="font-bold text-black bg-myGreen px-4 py-2 rounded mr-4"
                  onClick={handleSubmit((data) => handleCreateOrder(data, true))}
                >
                  Mua
                </button>
                <CssTextField
                  sx={{ color: 'red', maxWidth: 160, minWidth: 160 }}
                  label="KL đặt"
                  type="number"
                  inputProps={{ min: 0, max: 100000000, step: 100 }}
                  {...register('quantity', { required: true, valueAsNumber: true })}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className="flex items-center ml-3">
                <CssTextField
                  sx={{ maxWidth: 160, minWidth: 160 }}
                  label="Giá đặt"
                  type="number"
                  inputProps={{
                    min: currentStock.floorPrice / 1000 || 0,
                    max: currentStock.ceilPrice / 1000 || 0,
                    step: 0.01,
                  }}
                  {...register('price', { required: true, valueAsNumber: true })}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <button
                  className="font-bold bg-myRed px-4 py-2 rounded ml-4"
                  onClick={handleSubmit((data) => handleCreateOrder(data, false))}
                >
                  Bán
                </button>
              </div>
            </form>
          </div>
          <div className="flex flex-col mx-5">
            <span className="">Giá trị lệnh</span>
            <span>{numberWithCommas(orderValue)}</span>
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex flex-col mx-5">
            <span className="">Khối lượng</span>
            <span>x100</span>
          </div>
          <div className="flex flex-col mx-5">
            <span className="">Giá tiền</span>
            <span>x1000</span>
          </div>
        </div>
      </div>
      <VerifyTradingOtpModal fetchOTP={fetchOTP} isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />
    </div>
  );
};

export default PriceTableHeader;
