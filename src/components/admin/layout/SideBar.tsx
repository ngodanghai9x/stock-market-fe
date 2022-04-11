import React from 'react'
import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom'
import { SIDEBAR_OPTION } from '../../../constants/path-name'

const SideBar = () => {
  return (
    <div className='col-span-2 h-screen border-r'>
      <div className='p-4 text-white font-bold text-2xl border-b'>
        <p>thu gon</p>
      </div>
      <div>
        <ul className='flex flex-col'>
          {SIDEBAR_OPTION.map((option, index) => <li key={index} className='text-base  hover:bg-gray-100'>
            <CustomLink to={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </CustomLink>
          </li>)}
        </ul>
      </div>
    </div>
  )
}

function CustomLink({ children, to, ...props }: LinkProps) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link
        to={to}
        {...props}
        className={`block w-full h-full py-3  px-4 ${match ? 'font-bold' : ''}`}
      >
        {children}
      </Link>
    </div>
  );
}

export default SideBar