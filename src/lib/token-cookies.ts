import Cookies from 'js-cookie'
import { STORAGE } from '../constants/index'

export const tokenCookies = {
  get(){
    return Cookies.get(STORAGE.jwtToken) || ''
  }
}