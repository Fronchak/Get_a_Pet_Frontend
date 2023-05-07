import axios, { AxiosRequestConfig } from 'axios';
import RegisterInputs from '../types/RegisterInput';
import LoginInputs from '../types/LoginInputs';

const BASE_URL = 'http://localhost:5000';

export const requestBackendRegister = (regitsterInputs: RegisterInputs) => {
  return axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: '/auth/register',
    data: regitsterInputs
  });
}

export const requestBackendLogin = (loginInputs: LoginInputs) => {
  return axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: '/auth/login',
    data: loginInputs
  });
}

export const requestBackend = (config: AxiosRequestConfig) => {
  return axios({ ...config, baseURL: BASE_URL });
}
