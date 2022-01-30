import { RegisterPayload, LoginPayload } from './api-auth.type';
import { axiosClient } from "../lib/request"

const authBaseUrl = `${process.env.REACT_APP_API_HOST}/auth`

export const customerRegister =  (payload: RegisterPayload) => {
  return axiosClient.post(`${authBaseUrl}/register`, {
    ...payload
  })
}

export const customerLogin = (payload: LoginPayload) => {
  return axiosClient.post(`${authBaseUrl}/login`, {
    ...payload
  })
}