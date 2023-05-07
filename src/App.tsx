import { RouterProvider } from 'react-router';
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route
} from "react-router-dom";
import Root from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import RegisterPage from './pages/RegisterPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import AuthContextData from './types/AuthContextData';
import AuthContext from './context/AuthContext';
import HomePage from './pages/HomePage';
import PetsPage from './pages/PetsPage';
import { getTokenData } from './utils/auth';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={ <Root /> }
      errorElement={ <ErrorPage /> }
    >
      <Route element={ <HomePage /> } index />
      <Route element={ <PetsPage /> } path="pets" />
      <Route path="auth/register" element={ <RegisterPage /> } />
    </Route>
  )
);

const App = () => {

  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false
  });

  useEffect(() => {
    console.log('Chamou o use effect');
    const tokenData = getTokenData();
    if(tokenData) {
      setAuthContextData({
        authenticated: true,
        tokenData: tokenData
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authContextData, setAuthContextData }} >
      <RouterProvider router={ router } />
      <ToastContainer
        theme='dark'
        position='bottom-right'
        autoClose={3000}
      />
    </AuthContext.Provider>
  );
}

export default App;
