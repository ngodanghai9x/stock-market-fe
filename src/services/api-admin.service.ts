import axiosClient from '../lib/request';
import { MyResponse } from '../types';
import {
  AdminEditUserPayload,
  CreateCompanyPayload,
  CreateIndustryPayload,
  EditCompanyPayload,
  EditIndustryPayload,
  GetReportResponse,
  SearchPayload,
} from './api-admin.type';

const adminBaseUrl = `${process.env.REACT_APP_API_HOST}`;

export const getReport = async () => {
  const res = await axiosClient.get(`${adminBaseUrl}/report`);
  return new MyResponse<GetReportResponse>(res).data;
};
// missing MyResponse
export const getAllIndustry = async () => {
  const res = await axiosClient.get(`${adminBaseUrl}/companies/industries`);
  return res.data?.data.industries;
};

export const getAllCompany = async () => {
  const res = await axiosClient.get(`${adminBaseUrl}/companies`);
  return res.data?.data.companies;
};

export const getAllUser = async () => {
  const res = await axiosClient.get(`${adminBaseUrl}/users`);
  return res.data?.data.users;
};
// end missing MyResponse

export const searchIndustries = async ({ q = '', page = 1, size = 100 }: SearchPayload) => {
  const res = await axiosClient.get(`${adminBaseUrl}/companies/industries?q=${q}&page=${page}&size=${size}`);
  return new MyResponse<any>(res).data;
};

export const searchCompanies = async ({ q = '', page = 1, size = 100 }: SearchPayload) => {
  const res = await axiosClient.get(`${adminBaseUrl}/companies?q=${q}&page=${page}&size=${size}`);
  return new MyResponse<any>(res);
};

export const searchUsers = async ({ q = '', page = 1, size = 100 }: SearchPayload) => {
  const res = await axiosClient.get(`${adminBaseUrl}/users?q=${q}&page=${page}&size=${size}`);
  return new MyResponse<any>(res);
};

export const editUserByAdmin = async (payload: AdminEditUserPayload, userId: number) => {
  const res = await axiosClient.put(`${adminBaseUrl}/user/admin/${userId}`, {
    ...payload,
  });
  return new MyResponse<any>(res);
};

export const editCompany = async (payload: EditCompanyPayload, companyId: number) => {
  const res = await axiosClient.put(`${adminBaseUrl}/company/${companyId}`, {
    ...payload,
  });
  return new MyResponse<any>(res);
};

export const editIndustry = async (payload: EditIndustryPayload, industryId: number) => {
  const res = await axiosClient.put(`${adminBaseUrl}/company/industry/${industryId}`, {
    ...payload,
  });
  return new MyResponse<any>(res);
};

export const createIndustry = async (payload: CreateIndustryPayload) => {
  const res = await axiosClient.post(`${adminBaseUrl}/company/industry`, {
    ...payload,
  });
  return new MyResponse<any>(res);
};

export const createCompany = async (payload: CreateCompanyPayload) => {
  const res = await axiosClient.post(`${adminBaseUrl}/company`, {
    ...payload,
  });
  return new MyResponse<any>(res);
};

export const createCompanyNoAuth = async (payload: CreateCompanyPayload) => {
  const res = await axiosClient.post(`${adminBaseUrl}/company/no-auth`, {
    ...payload,
  });
  return new MyResponse<any>(res);
};
