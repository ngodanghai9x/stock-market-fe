import Cookies from 'js-cookie';
import { JWT_TOKEN } from '../constants/request';
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
    Cookies.set(JWT_TOKEN, token);
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
