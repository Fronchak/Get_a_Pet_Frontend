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
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import { getAuthData } from './utils/storage';
import MyPetsPage from './pages/MyPetsPage';
import PetRegisterPage from './pages/PetRegisterPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={ <Root /> }
      path="/"
      errorElement={ <ErrorPage /> }
    >
      <Route element={ <HomePage /> } index />
      <Route element={ <PetsPage /> } path="pets" />
      <Route element={ <RegisterPage /> } path="auth/register"/>
      <Route element={ <LoginPage /> } path="auth/login" />
      <Route element={ <ProfilePage /> } path="user/profile" />
      <Route element={ <MyPetsPage /> } path="user/my-pets" />
      <Route element={ <PetRegisterPage /> } path="/pets/register" />
    </Route>
  )
);

const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false
  });

  useEffect(() => {
    console.log('Chamou o use effect');
    const tokenData = getTokenData();
    if(tokenData) {
      setAuthContextData({
        authenticated: true,
        tokenData: tokenData,
        token: getAuthData()?.access_token
      });
    }
    setIsLoading(false);
  }, []);

  return (
    isLoading ? <></> :
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
