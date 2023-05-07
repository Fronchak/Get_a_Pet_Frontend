import { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from "../../components/Container";
import LoginInputs, { LoginInputsKeys } from "../../types/LoginInputs";
import useAuthContext from '../../hooks/useAuthContext';
import { toast } from 'react-toastify';
import { requestBackendLogin } from '../../utils/request';
import { saveAuthData } from '../../utils/storage';
import { getTokenData } from '../../utils/auth';


const LoginPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>();
  const [wasSubmit, setWasSubmit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setAuthContextData } = useAuthContext();
  const location = useLocation();
  const { state } = location;
  const from = state ? state.from : '/';

  const getInputClassName = (fieldName: LoginInputsKeys): string => {
    return wasSubmit ? ((errors[fieldName]?.message) ? 'is-invalid' : 'is-valid') : '';
  }

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      setIsLoading(true);
      const response = await requestBackendLogin(data);
      setIsLoading(false);
      saveAuthData(response.data);
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData()
      });
      toast.success('Login with success');
      navigate(from, {
        replace: true
      });
    }
    catch(e) {
      setIsLoading(false);
      toast.error('Email or password invalid');
    }
  }

  return (
    <Container>
      <div className="form-container">
        <h1 className="mb-4 primary-color fw-bold">Login</h1>
        <form onSubmit={ handleSubmit(onSubmit) }>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              { ...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: `Invalid email`
                }
              })}
              type="email"
              name="email"
              id="email"
              placeholder="Type your email"
              className={`form-control ${getInputClassName('email')}`}
            />
            <div className="invalid-feedback">
              { errors.email?.message }
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              { ...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password shoud have at least 6 charactectes'
                }
              })}
              type="password"
              name="password"
              id="password"
              placeholder="Type your password"
              className={`form-control ${getInputClassName('password')}`}
            />
            <div className="invalid-feedback">
              { errors.password?.message }
            </div>
          </div>
          <div className="mb-3">
            <button
              type="submit"
              className="my-btn-primary"
              onClick={() => setWasSubmit(true)}
            >
              { isLoading ?
               <>
                <span>Login </span>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
               </>
               :
               'Login' }

            </button>
          </div>
        </form>
        <p>Doesn't have an account yet? <Link to="/auth/register">Click here</Link></p>
      </div>
    </Container>
  );
}

export default LoginPage;
