import React from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
const SubHeader = () => {
  return (
    <div className='bg-black text-white flex px-4 py-2 justify-center'>
      <span>
        KL (cp): 764tr
      </span>
      <span className='block mx-6'>
        GT: 764,989 tỷ
      </span>
      <div className='flex items-center mr-6'>
        <span>
          VNI:
        </span>
        <div className='text-green-300 flex'>
          <span className='block mx-2'>
            12345
          </span>
          <span className='block flex items-center ml-1'>
            <ArrowUpwardIcon /> <span>15.90%</span>
          </span>
        </div>
      </div>
      <div className='flex items-center mr-6'>
        <span>
          VN30:
        </span>
        <div className='text-green-300 flex'>
          <span className='block mx-2'>
            12345
          </span>
          <span className='block flex items-center ml-1'>
            <ArrowUpwardIcon /> <span>15.90%</span>
          </span>
        </div>
      </div>
      <div className='flex items-center mr-6'>
        <span>
          HNX:
        </span>
        <div className='text-green-300 flex'>
          <span className='block mx-2'>
            12345
          </span>
          <span className='block flex items-center ml-1'>
            <ArrowUpwardIcon /> <span>15.90%</span>
          </span>
        </div>
      </div>
      <div className='flex items-center mr-6'>
        <span>
          UPCOM:
        </span>
        <div className='text-green-300 flex'>
          <span className='block mx-2'>
            12345
          </span>
          <span className='block flex items-center ml-1'>
            <ArrowUpwardIcon /> <span>15.90%</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default SubHeader