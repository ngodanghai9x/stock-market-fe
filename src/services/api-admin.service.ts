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
  return new MyResponse<GetReportResponse>(res);
};

export const getAllIndustry = async () => {
  const res = await axiosClient.get(`${adminBaseUrl}/companies/industries`);
  return res.data.data.industries;
};

export const getAllCompany = async () => {
  const res = await axiosClient.get(`${adminBaseUrl}/companies`);
  return res.data.data.companies;
};

export const getAllUser = async () => {
  const res = await axiosClient.get(`${adminBaseUrl}/users`);
  return res.data.data.users;
};

export const searchIndustries = async ({ q = '', page = 1, size = 100 }: SearchPayload) => {
  const res = await axiosClient.get(`${adminBaseUrl}/companies/industries?q=${q}&page=${page}&size=${size}`);
  return res.data.data.industries;
};

export const searchCompanies = async ({ q = '', page = 1, size = 100 }: SearchPayload) => {
  const res = await axiosClient.get(`${adminBaseUrl}/companies?q=${q}&page=${page}&size=${size}`);
  return res.data.data.companies;
};

export const searchUsers = async ({ q = '', page = 1, size = 100 }: SearchPayload) => {
  const res = await axiosClient.get(`${adminBaseUrl}/users?q=${q}&page=${page}&size=${size}`);
  return res.data.data.users;
};

export const editUserByAdmin = (payload: AdminEditUserPayload, userId: number) => {
  return axiosClient.post(`${adminBaseUrl}/user/admin/${userId}`, {
    ...payload,
  });
};

export const editCompany = (payload: EditCompanyPayload, companyId: number) => {
  return axiosClient.post(`${adminBaseUrl}/company/${companyId}`, {
    ...payload,
  });
};

export const editIndustry = (payload: EditIndustryPayload, industryId: number) => {
  return axiosClient.post(`${adminBaseUrl}/company/industry/${industryId}`, {
    ...payload,
  });
};

export const createIndustry = (payload: CreateIndustryPayload) => {
  return axiosClient.post(`${adminBaseUrl}/company/industry`, {
    ...payload,
  });
};

export const createCompany = (payload: CreateCompanyPayload) => {
  return axiosClient.post(`${adminBaseUrl}/company`, {
    ...payload,
  });
};
