import Cookies from 'js-cookie'
import { JWT_DATA } from '../constants/request';
import { LoginPayload } from '../services/api-auth.type';
import { customerLogin } from './../services/api-auth.service';
export const login = async (data: LoginPayload) => {
  try {
    const res = await customerLogin(data)
    Cookies.set(JWT_DATA, JSON.stringify(res.data.data))
    return res.data;
  } catch (error) {
    return Promise.reject(error)
  }
}