import Cookies from 'js-cookie'
import { JWT_TOKEN } from '../constants/request'

export const tokenCookies = {
  get(){
    return Cookies.get(JWT_TOKEN) || ''
  }
}