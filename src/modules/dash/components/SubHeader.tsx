import React from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Avatar, Tooltip } from '@mui/material';
import CustomLink from '../../../components/CustomLink';
import { USER_SIDEBAR } from '../../../components/user/layout/UserSideBar';

const SubHeader = () => {
  return (
    <div className='bg-black text-white flex items-center pr-4'>
      <div className='flex px-4 py-2 justify-center flex-1'>
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
      <div>
        <Tooltip title={<ul className="flex flex-col">
          {Object.keys(USER_SIDEBAR).map((option, index) => (
            <li key={`UserSideBar${option}`} className="text-base  hover:bg-gray-100 hover:text-black">
              <CustomLink to={option}>
                <span className="mr-3">{USER_SIDEBAR[option].render()}</span>
                <span className="">{USER_SIDEBAR[option].label}</span>
              </CustomLink>
            </li>
          ))}
        </ul>} arrow>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: '24px', height: '24px', p: 1, fontSize: '14px' }} />
        </Tooltip>
      </div>
    </div>
  )
}

export default SubHeader