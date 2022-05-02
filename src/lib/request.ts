import axios from 'axios';
import { AUTHORIZATION_HEADER_KEY } from '../constants/request';
import { GetReportResponse } from '../services/api-admin.type';
import { MyResponse } from '../types';
import { tokenCookies } from './token-cookies';

const axiosClient = axios.create();

// add timestamp as default
// axiosClient.interceptors.request.use((config) => {
//   console.log('config');
//   // Object.assign(config.data, { timestamp: new Date().getTime() });
//   return config;
// });

axiosClient.interceptors.request.use(
  (config) => {
    const { token } = tokenCookies.get();
    if (token) {
      config.headers = {
        [AUTHORIZATION_HEADER_KEY]: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    // return new MyResponse<GetReportResponse>(response);
    return response;
  },
  (error) => {
    console.warn('Error status', error?.response?.status);
    // return Promise.reject(error)
    if (error.response) {
      return error.response;
    } else {
      return Promise.reject(error);
    }
  }
);
export default axiosClient;
