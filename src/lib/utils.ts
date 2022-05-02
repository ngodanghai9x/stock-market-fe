import Cookies from 'js-cookie';
import moment from 'moment';
import { StatusIdType, StatusLabelType, STORAGE } from '../constants';
import { LoginPayload } from '../services/api-auth.type';
import { GroupedStockOrders, MatchingGroupedStockOrders, PriceItem, GroupedHistory } from '../services/api-user.type';
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
    const expiresIn = Date.now() + Number(process.env.REACT_APP_REFRESH_TOKEN_LIFE) * 1000;
    Cookies.set(
      STORAGE.jwtToken,
      JSON.stringify({
        token,
        refreshToken,
        expiresIn,
      }),
      { expires: expireTime }
    );
    localStorage.setItem(STORAGE.userData, JSON.stringify(user));

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

export const setCookie = (
  cname: string,
  cvalue: string,
  expSecond: number = +Number(process.env.REACT_APP_TOKEN_LIFE)
) => {
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

export const flatGrouped = (
  matchingGrouped: MatchingGroupedStockOrders,
  grouped: GroupedStockOrders,
  history: GroupedHistory
): PriceItem[] => {
  const list = [] as PriceItem[];
  const WORDS = ['best', 'second', 'third'];
  for (const [symbol, symbolArr] of Object.entries(grouped)) {
    let sum = 0;
    let total = 0;
    const matchingOrders = matchingGrouped[symbol]?.matchingOrders || [];
    const refPrice = +(history[symbol]?.closePrice || +matchingOrders[0]?.price).toFixed(0);
    matchingOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const matchingInfo = {
      matchingPrice: +matchingOrders[0]?.price,
      matchingAmount: 123,
      matchingChange: +matchingOrders[0]?.price - refPrice,
      // matchingOrders: matchingOrders.filter((i) => i.price === +matchingOrders[0]?.price && i.fee > 0),
    };
    const prices = matchingOrders.map((o) => o.price);
    matchingOrders.forEach((o) => {
      sum += o.price * o.quantity;
      total += o.quantity;
    });

    let toReturn = {
      ...matchingInfo,
      symbol,
      ceilPrice: +(refPrice * 1.1).toFixed(0),
      refPrice,
      floorPrice: +(refPrice * 0.9).toFixed(0),
      matchedHigh: prices.length && Math.max(...prices),
      matchedLow: prices.length && Math.min(...prices),
      matchedAvg: total && sum / total,
      matchedTotal: total,
    } as PriceItem;

    const buyPrices = Object.keys(symbolArr.buy || {}).sort((a, b) => +b - +a);
    const sellPrices = Object.keys(symbolArr.sell || {}).sort((a, b) => +a - +b);
    WORDS.forEach((word, i) => {
      toReturn = {
        ...toReturn,
        [`${word}Buy`]: {
          price: +buyPrices[i],
          amount: 456,
          // orders: symbolArr.buy?.[buyPrices[i]] || [],
        },
        [`${word}Sell`]: {
          price: +sellPrices[i],
          amount: 789,
          // orders: symbolArr.sell?.[sellPrices[i]] || [],
        },
      };
    });
    list.push(toReturn);
  }
  return list;
};

export const formatPrice = (v: number): string | number => {
  if (!v) return '--';
  return parseFloat((v / 1000).toFixed(3));
};

export const formatAmount = (v: number): string | number => {
  if (!v) return '--';
  return parseFloat((v / 100).toFixed(3));
};

export const formatDate = (v: string | Date, format: string = 'DD/MM/YYYY'): string => {
  return moment(v).format(format);
};

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
