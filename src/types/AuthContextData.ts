import TokenData from "./TokenData"

type AuthContextData = {
  authenticated: boolean,
  tokenData?: TokenData
}

export default AuthContextData;
