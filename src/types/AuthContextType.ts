import AuthContextData from "./AuthContextData"

type AuthContextType = {
  authContextData: AuthContextData,
  setAuthContextData: (authContextData: AuthContextData) => void
}

export default AuthContextType;
