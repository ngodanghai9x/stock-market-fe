import Cookies from 'js-cookie'
import { JWT_DATA } from '../constants/request'

export const tokenCookies = {
  get(){
    return Cookies.get(JWT_DATA) || ''
  }
}