import axios, { AxiosError, AxiosInstance } from "axios";
import { AUTHORIZATION_HEADER_KEY } from "../constants/request";
import { tokenCookies } from "./token-cookies";

export const axiosClient = axios.create();

// add timestamp as default
axiosClient.interceptors.request.use((config) => {
  Object.assign(config.data, {timestamp : new Date().getTime()})
  return config
})

export const setupHeaderWithToken = () => {
  setupAuthInterceptor()
}

const setupAuthInterceptor = () => {
  const { token } = tokenCookies.get()
  if(token) {
    axiosClient.defaults.headers.common[AUTHORIZATION_HEADER_KEY] = token;
  }

  axiosClient.interceptors.response.use((res) => res, async (error: AxiosError) => {
    if(error.response) {
      if(error.response.status === 401) {
        // refresh token here
      }
    }
  })
}