import React, { useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputBooking from './InputBooking';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

type OrderValueType = {
  orderQtn: number;
  orderPrice: number;
}
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
    }
  },
});


const PriceTableHeader = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<OrderValueType>({
    reValidateMode: 'onBlur',
  });
  const [account, setAccount] = React.useState('');
  const [orderValue, setOrderValue] = useState<Number>(0)
  const handleChange = (event: SelectChangeEvent) => {
    setAccount(event.target.value as string);
  };

  const orderValueHandle: SubmitHandler<OrderValueType> = async (data) => {
    console.log(data)
  };
  React.useEffect(() => {
    const subscription = watch(({ orderQtn, orderPrice }) => {
      if (orderQtn && orderPrice) setOrderValue(orderQtn * orderPrice)
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  return (
    <div className='text-white bg-trueGray-800'>
      <div className='flex p-4 items-center'>
        <span>VHM</span>
        <div className='mx-6'>
          {/* <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">TK</InputLabel>
            <Select
              value={account}
              label="TK"
              onChange={handleChange}
            >
              <MenuItem>Thường</MenuItem>
            </Select>
          </FormControl> */}
        </div>
        <div className='flex flex-col mx-6'>
          <span>Sức mua</span>
          <span>19,679</span>
        </div>
        <div className='flex flex-col mx-6'>
          <span>Ký quỹ</span>
          <span>0%</span>
        </div>
        <div className='mx-6' >
          <form onSubmit={handleSubmit(orderValueHandle)} className="w-ful flex">
            <div className='flex items-center'>
              <button className='font-bold text-black bg-green-400 px-4 py-2 rounded mr-4'>Mua</button>
              <CssTextField
                sx={{ color: 'red' }}
                id="outlined-number"
                label="KL Đặt"
                type="number"
                {...register('orderQtn', { required: true })}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className='flex items-center ml-3'>
              <CssTextField
                id="outlined-number"
                label="Giá trị đặt"
                type="number"
                {...register('orderPrice', { required: true })}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <button className='font-bold bg-red-500 px-4 py-2 rounded ml-4'>Bán</button>
            </div>
          </form>
        </div>
        <div className=''>
          <span className='block mr-5'>Giá trị lệnh</span>
          <span>{orderValue}</span>
        </div>
      </div >
    </div >
  )
}

export default PriceTableHeader