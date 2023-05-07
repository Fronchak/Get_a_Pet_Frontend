import { createContext } from 'react';
import AuthContextType from '../types/AuthContextType';

const AuthContext = createContext<AuthContextType>({
  authContextData: {
    authenticated: false
  },
  setAuthContextData: () => {}
});

export default AuthContext;
