import TokenData from "./TokenData"

type AuthContextData = {
  authenticated: boolean,
  token?: string,
  tokenData?: TokenData
}

export default AuthContextData;
