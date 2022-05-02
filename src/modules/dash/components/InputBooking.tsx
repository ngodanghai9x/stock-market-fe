import { TextField } from '@mui/material'
import React from 'react'

const InputBooking = () => {
  return (
    <div>
      <button>Buy</button>
      <TextField
        id="outlined-number"
        label="Number"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
      />    </div>
  )
}

export default InputBooking