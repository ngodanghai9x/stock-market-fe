import axios from 'axios';
import { axiosClient } from '../lib/request';

const adminBaseUrl = `${process.env.REACT_APP_API_HOST}`;

export const getAllIndustry = async () => {
  const a = await axios.get(`${adminBaseUrl}/companies/industries`);
  return a.data.data.industries;
};
