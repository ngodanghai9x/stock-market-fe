import React, { useContext } from 'react'
import { AppContext } from '../context'

const Header = ({ ...pros }) => {
  const { notification } = useContext(AppContext)
  return (
    <div className={`${pros}`}>
      {notification}
    </div>
  )
}

export default Header
