import axios, { AxiosRequestConfig } from 'axios';
import RegisterInputs from '../types/RegisterInput';

const BASE_URL = 'http://localhost:5000';

export const requestBackendRegister = (regitsterInputs: RegisterInputs) => {
  return axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: '/auth/register',
    data: regitsterInputs
  });
}
