import { RouterProvider } from 'react-router';
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route
} from "react-router-dom";
import Root from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import RegisterPage from './pages/RegisterPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={ <Root /> }
      errorElement={ <ErrorPage /> }
    >
      <Route path="auth/register" element={ <RegisterPage /> } />
    </Route>
  )
);

const App = () => {
  return (
    <RouterProvider router={ router } />
  );
}

export default App;
