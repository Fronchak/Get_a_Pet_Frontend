import axios, { AxiosRequestConfig } from 'axios';
import RegisterInputs from '../types/RegisterInput';
import LoginInputs from '../types/LoginInputs';
import { getAuthData } from './storage';
import UnauthorizedError from '../errors/UnauthorizedError';
import { isAuthenticatedByToken } from './auth';

export const BASE_URL = 'http://localhost:5000';

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

export const requestAuthenticatedRequest = (config: AxiosRequestConfig) => {
  const token = getAuthData();
  if(token && isAuthenticatedByToken(token.access_token)) {
    let headers = config.headers;
    const auth = `Bearer ${token.access_token}`;
    headers = { ...headers, Authorization: auth };
    return axios({ ...config, baseURL: BASE_URL, headers: headers });
  }
  throw new UnauthorizedError('You need to be logged in to access this content');
}
