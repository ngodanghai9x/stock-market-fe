import React, { createContext, ReactElement, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { pathNames, publicRoutes } from "../../constants/path-name"
import { tokenCookies } from "../../lib/token-cookies"
import { User } from "../../services/api-auth.type"

const initialUser: User = {
  fullName: '',
  username: ''
}

const checkAuthenticated = () => {
  const token = tokenCookies.get()
  if (!token) return { result: false }
  return { result: true, userData: JSON.parse(token).user };
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
    setAuthenticated(result);
    if (!userData) return;
    setUser(userData)
  }, [])

  useEffect(() => {
    const pathname = location.pathname;
    if (publicRoutes.includes(pathname) && isAuthenticated) {
      console.log('ree')
      navigation(pathNames.home)
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