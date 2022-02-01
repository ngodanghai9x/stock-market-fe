import Cookies from 'js-cookie';
import { STORAGE } from '../constants';
import { LoginPayload } from '../services/api-auth.type';
import { TokenInfo } from '../types';
import { customerLogin } from './../services/api-auth.service';
// import crypto from 'crypto';

// export const generateOTP = async (bytes: number = 256): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     crypto.randomBytes(bytes, (err, buf) => {
//       if (err) reject(err);

//       const token = crypto.createHash('sha1').update(buf).digest('hex');
//       resolve(token);
//     });
//   });
// };

export const login = async (data: LoginPayload) => {
  try {
    const res = await customerLogin(data);
    const { token, refreshToken, user } = res.data.data;
    // Expiration time (ms): 4h
    const expireTime = new Date(new Date().getTime() + Number(process.env.REACT_APP_TOKEN_LIFE) * 1000);
    Cookies.set(STORAGE.jwtToken, token, {expires: expireTime});
    localStorage.setItem(STORAGE.userData,JSON.stringify(user) )

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getTokenData = (token: string): TokenInfo | null => {
  try {
    let [header, data, sign] = token.split('.');
    const tokenInfo = JSON.parse(atob(data)) as TokenInfo;

    return tokenInfo as TokenInfo;
  } catch (error) {
    return null;
  }
};

export const isEmpty = (value: string | number): boolean => {
  return value === null || value === undefined || String(value).trim() === '';
};

export const hideEmail = (email: string): string => {
  if (!email) return '';
  const array = email.split('@');
  const temp = array[0].slice(0, 3);
  return `${temp}*******@${array[1]}`;
};

export const hidePhone = (phone: string): string => {
  if (!phone) return '';
  const temp = phone.slice(phone.length - 3, phone.length);
  return `********${temp}`;
};

export const getMinute = (second: number): string => {
  const _minute = Math.floor(second / 60);
  const _second = second % 60;
  return `${_minute}m : ${_second}s`;
};

export const setCookie = (cname: string, cvalue: string, expSecond: number = +TOKEN_LIFE) => {
  const d = new Date();
  d.setTime(d.getTime() + expSecond * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
};

export const getCookie = (cname: string) => {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};
