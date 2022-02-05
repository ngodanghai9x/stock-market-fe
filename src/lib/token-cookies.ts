import Cookies from 'js-cookie'
import { STORAGE } from '../constants/index'

type TokenType = {
  token: string;
  refreshToken: string;
  expiresIn: number;
}

const initialToken : TokenType = {
  token: '',
  refreshToken: '',
  expiresIn: 0
}

export const tokenCookies = {
  get(){
    const token = Cookies.get(STORAGE.jwtToken)
    return token ?  JSON.parse(token) as TokenType : initialToken
  }
}