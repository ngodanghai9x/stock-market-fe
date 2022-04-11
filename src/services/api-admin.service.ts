import axios from 'axios';
import { axiosClient } from '../lib/request';

const adminBaseUrl = `${process.env.REACT_APP_API_HOST}`;

export const getAllIndustry = async () => {
  const res = await axios.get(`${adminBaseUrl}/companies/industries`);
  return res.data.data.industries;
};

export const getAllCompany = async () => {
  const res = await axios.get(`${adminBaseUrl}/companies`);
  return res.data.data.companies;
};
