import React, { createContext, ReactElement, useEffect, useState } from "react"
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from "react-router-dom"
import { STORAGE } from "../../constants"
import { PATH_NAMES, PUBLIC_ROUTES } from "../../constants/path-name"
import { tokenCookies } from "../../lib/token-cookies"
import { User } from "../../services/api-auth.type"
import { JWT_TOKEN } from "../../constants/request";
import { setupHeaderWithToken } from "../../lib/request";

const initialUser: User = {
  userId: 0,
  fullName: '',
  username: '',
  role: ''
}

const checkAuthenticated = () => {
  const { token, expiresIn } = tokenCookies.get()
  if (!token) return { result: false }
  if (Date.now() > expiresIn) {
    Cookies.remove(STORAGE.jwtToken)
    return { result: false }
  }
  const userData = localStorage.getItem(STORAGE.userData)
  if (!userData) return { result: false }
  return { result: true, userData: JSON.parse(userData) };
}

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>
}>({
  isAuthenticated: false,
  user: initialUser,
  setAuthenticated: () => { },
  setUser: () => { }
})


export const AuthProvider = (props: { children: ReactElement }) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(() => {
    return checkAuthenticated().result
  })
  const [user, setUser] = useState<User>(initialUser)

  const location = useLocation()
  const navigation = useNavigate()

  useEffect(() => {
    const { result, userData } = checkAuthenticated()
    if (!userData) return;
    setUser(userData)

    setAuthenticated(result);
    if (result) {
      setupHeaderWithToken()
    }
  }, [location])

  useEffect(() => {
    const pathname = location.pathname;
    if (PUBLIC_ROUTES.includes(pathname) && isAuthenticated) {
      navigation(PATH_NAMES.home)
    }

  }, [isAuthenticated, location, navigation])

  return (
    <AuthContext.Provider value={
      {
        isAuthenticated,
        setAuthenticated,
        user,
        setUser
      }
    }>
      {props.children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {


}