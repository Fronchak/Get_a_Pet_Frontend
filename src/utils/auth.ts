import jwtDecode from "jwt-decode";
import TokenData from "../types/TokenData";
import { getAuthData } from "./storage";

export const getTokenData = (): TokenData | undefined => {
  const rawToken = getAuthData();
  if(!rawToken) return undefined;
  try {
    return jwtDecode(rawToken.access_token) as TokenData;
  }
  catch(error) {
    return undefined;
  }
}

export const isAuthenticated = (): boolean => {
  const tokenData = getTokenData();
  return tokenData !== undefined && (tokenData.exp > (Date.now()/1000));
}
