import axios, { AxiosRequestConfig } from "axios";
import useAuthContext from "./useAuthContext"
import { BASE_URL } from "../utils/request";
import UnauthorizedError from "../errors/UnauthorizedError";

const useAPI = () => {
  const { authContextData } = useAuthContext();

  const requestBackend = (config: AxiosRequestConfig) => {
    return axios({ ...config, baseURL: BASE_URL });
  }

  const requestAuthenticatedRequest = (config: AxiosRequestConfig) => {
    if(authContextData.authenticated) {
      let headers = config.headers;
      const auth = `Bearer ${authContextData.tokenData?.username}`;
      headers = { ...headers, Authorization: auth };
      return axios({ ...config, baseURL: BASE_URL, headers: headers });
    }
    throw new UnauthorizedError('You need to be logged in to access this content');
  }

  return { requestBackend, requestAuthenticatedRequest };
}

export default useAPI;
