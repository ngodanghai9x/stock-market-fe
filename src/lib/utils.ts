import { SxProps } from '@mui/material';
import Cookies from 'js-cookie';
import moment from 'moment';
import { COLOR, StatusIdType, StatusLabelType, STORAGE } from '../constants';
import { StockOrder } from '../services/api-admin.type';
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
    if (res.status !== 200) {
      throw Error(res.message);
    }
    const { token, refreshToken, user } = res.data;
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

    return res;
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
  for (const [symbol, purchaseObj] of Object.entries(grouped)) {
    let sum = 0;
    let total = 0;
    const matchingOrders = matchingGrouped[symbol]?.matchingOrders || [];
    const refPrice = +(history[symbol]?.closePrice || +matchingOrders[matchingOrders.length - 1]?.price).toFixed(0);
    matchingOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const matchingInfo = {
      matchingPrice: +matchingOrders[0]?.price,
      matchingChange: +matchingOrders[0]?.price - refPrice,
      matchingAmount: (matchingOrders.filter((i) => i.price === +matchingOrders[0]?.price && i.fee > 0) || []).reduce(
        (sum, obj) => sum + obj.quantity,
        0
      ),
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

    const buyPrices = Object.keys(purchaseObj.buy || {}).sort((a, b) => +b - +a);
    // console.log('🚀 purchaseObj', purchaseObj);
    // console.log('🚀 buyPrices', buyPrices);
    console.log({
      a: (purchaseObj.buy?.[buyPrices[3]] || []).reduce((sum, obj) => sum + obj?.quantity, 0),
      b: purchaseObj.buy?.[buyPrices[3]],
    });
    const sellPrices = Object.keys(purchaseObj.sell || {}).sort((a, b) => +a - +b);
    WORDS.forEach((word, i) => {
      const amountBuy = (purchaseObj.buy?.[buyPrices[i]] || []).reduce((sum, obj) => sum + obj?.quantity, 0);
      const amountSell = (purchaseObj.sell?.[sellPrices[i]] || []).reduce((sum, obj) => sum + obj?.quantity, 0);

      toReturn = {
        ...toReturn,
        [`${word}Buy`]: {
          price: +buyPrices[i],
          amount:
            amountBuy -
            (purchaseObj.buy?.[buyPrices[i]] || []).reduce(
              (sum, obj) => sum + (obj?.orderMatchings || []).reduce((omSum, om) => omSum + om.quantity, 0),
              0
            ),
          // orders: symbolArr.buy?.[buyPrices[i]] || [],
        },
        [`${word}Sell`]: {
          price: +sellPrices[i],
          amount:
            amountSell -
            (purchaseObj.sell?.[sellPrices[i]] || []).reduce(
              (sum, obj) => sum + (obj?.orderMatchings || []).reduce((omSum, om) => omSum + om.quantity, 0),
              0
            ),
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
  return (v / 1000).toFixed(2);
  // return parseFloat((v / 1000).toFixed(3));
};

export const formatAmount = (v: number): string | number => {
  if (!v) return '--';
  return ((v / 100).toFixed(1));
  // return parseFloat((v / 100).toFixed(3));
};

export function formatTotal(num: number) {
  if (num > 999 && num < 1000000) {
    return numberWithCommas(+(num / 1000).toFixed(1)) + ' K'; // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000000) {
    return ((num / 1000000000).toFixed(1)) + ' B';
  } else if (num > 1000000) {
    return ((num / 1000000).toFixed(1)) + ' M'; // convert to M for number from > 1 million
  } else if (num < 900) {
    return num; // if value < 1000, nothing to do
  }
}

export const formatDate = (v?: string | Date, format: string = 'DD/MM/YYYY'): string => {
  if (!v) return '';
  return moment(v).format(format);
};

export const formatOrderStatus = (order: StockOrder): string => {
  if (!order) return '';
  if (order.statusId === StatusIdType.cancel && order.isDone) {
    return 'Đã hủy';
  }
  if (order.statusId === StatusIdType.reject && order.isDone) {
    return 'Hết hạn';
  }
  return order.isDone ? 'Hoàn thành' : 'Chờ khớp';
};

export function numberWithCommas(x?: number) {
  if (!x) return 0;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function isFloat(n: number) {
  return Number(n) === n && n % 1 !== 0;
}

export const calculateColor = (row: PriceItem, value: number): string => {
  switch (value) {
    case row.ceilPrice:
      return COLOR.myPurple;
    case row.floorPrice:
      return COLOR.myBlue;
    case row.refPrice:
      return COLOR.myOrange;
    default: {
      if (value > row.refPrice) {
        return COLOR.myGreen;
      }
      if (value < row.refPrice) {
        return COLOR.myRed;
      }
      return 'white';
    }
  }
};

export const getFavSymbolsFromStorage = () => {
  return localStorage.getItem(STORAGE.favSymbols)?.split(';') || [];
};

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name: string, sx?: SxProps) {
  try {
    return {
      sx: {
        ...sx,
        bgcolor: stringToColor(name),
        // width: 32,
        // height: 32,
      },
      children: `${name.split(' ')?.[0]?.[0] || name}${name.split(' ')?.[1]?.[0] || ''}`,
      title: name,
      alt: name,
    };
  } catch (error) {
    console.log('stringAvatar', name);
    console.error('error', error);
  }
}
