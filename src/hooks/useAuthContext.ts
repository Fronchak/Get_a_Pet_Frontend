import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const useAuthContext = () => {

    const {authContextData, setAuthContextData} = useContext(AuthContext);

    return { authContextData, setAuthContextData };
}

export default useAuthContext;
