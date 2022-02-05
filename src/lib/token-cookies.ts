import Cookies from 'js-cookie'
import { JWT_TOKEN } from '../constants/request'

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
    const token = Cookies.get(JWT_TOKEN)
    return token ?  JSON.parse(token) as TokenType : initialToken
  }
}