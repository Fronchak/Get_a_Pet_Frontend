import TokenResponse from "../types/TokenResponse";

const AUTH_DATA = 'authData';

export const saveAuthData = (tokenResponse: TokenResponse) => {
  localStorage.setItem(AUTH_DATA, JSON.stringify(tokenResponse));
}

export const getAuthData = (): TokenResponse | undefined => {
  const rawObj = localStorage.getItem(AUTH_DATA);
  if(rawObj) {
    return JSON.parse(rawObj) as TokenResponse;
  }
  return undefined;
}

export const removeAuthData = () => {
  localStorage.removeItem(AUTH_DATA);
}
