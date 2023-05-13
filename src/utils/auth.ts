import jwtDecode from "jwt-decode";
import TokenData from "../types/TokenData";
import { getAuthData } from "./storage";

export const getTokenData = (): TokenData | undefined => {
  const rawToken = getAuthData();
  if(!rawToken) return undefined;
  return getTokenDataByToken(rawToken.access_token);
}

export const getTokenDataByToken = (token: string) => {
  try {
    return jwtDecode(token) as TokenData;
  }
  catch(error) {
    return undefined;
  }
}

export const isAuthenticated = (): boolean => {
  const rawToken = getAuthData();
  return rawToken ? isAuthenticatedByToken(rawToken.access_token) : false;
}

export const isAuthenticatedByToken = (token: string) => {
  const tokenData = getTokenDataByToken(token);
  return tokenData !== undefined && (tokenData.exp > (Date.now()/1000));
}
