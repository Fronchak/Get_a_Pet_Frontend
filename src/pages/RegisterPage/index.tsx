import { Link, useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import RegisterInputs, { RegisterInputsKeys } from "../../types/RegisterInput";
import { requestBackendRegister } from "../../utils/request";
import { saveAuthData } from "../../utils/storage";
import useAuthContext from "../../hooks/useAuthContext";
import { getTokenData } from "../../utils/auth";

const RegisterPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInputs>();
  const [wasSubmit, setWasSubmit] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setAuthContextData } = useAuthContext();

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    try {
      const response = await requestBackendRegister(data);
      saveAuthData(response.data);
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData()
      });
      toast.success('Account created with success');
      navigate('/');
    }
    catch(e) {
      console.error(e);
      toast.error('Someting went wrong');
    }
  }

  const getInputClassName = (fieldName: RegisterInputsKeys): string => {
    return wasSubmit ? ((errors[fieldName]?.message) ? 'is-invalid' : 'is-valid') : '';
  }

  return (
    <Container>
      <div className="form-container">
        <h1 className="mb-4 primary-color fw-bold">Create your Account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label" htmlFor="name">Name</label>
            <input
              { ...register('name', {
                required: 'Name is required',
                pattern: {
                  value: /[\S+]/,
                  message: 'Name cannot be empty'
                }
              })}
              type="text"
              name="name"
              id="name"
              placeholder="Type your name"
              className={`form-control ${getInputClassName('name')}`}
            />
            <div className="invalid-feedback">
              { errors.name?.message }
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="phone">Phone</label>
            <input
              { ...register('phone', {
                required: 'Phone is required',
                pattern: {
                  value: /[\S+]/,
                  message: 'Name cannot be empty'
                }
              })}
              type="phone"
              name="phone"
              id="phone"
              placeholder="Type your phone"
              className={`form-control ${getInputClassName('phone')}`}
            />
            <div className="invalid-feedback">
              { errors.phone?.message }
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">E-mail</label>
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
                  message: 'Password should have at least 6 characteres'
                },
                validate: (value, formValue) =>  (value === formValue.confirmPassword) || 'Passwords must be the same'
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
            <label className="form-label" htmlFor="confirmPassword">Confirm your Password</label>
            <input
              { ...register('confirmPassword', {
                required: 'Confirm password is required',
                minLength: {
                  value: 6,
                  message: 'Confirm password should have at least 6 characteres'
                },
                validate: (value, formValue) =>  (value === formValue.password) || 'Passwords must be the same'
              })}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Repeat your password"
              className={`form-control ${getInputClassName('confirmPassword')}`}
            />
              <div className="invalid-feedback">
                { errors.confirmPassword?.message }
              </div>
          </div>
          <div className="mb-3">
            <button
              type="submit"
              className="my-btn-primary"
              onClick={() => setWasSubmit(true)}
            >Register</button>
          </div>
        </form>
        <p>Already have an account? <Link to="/auth/login">Click here</Link></p>
      </div>


    </Container>
  );
}

export default RegisterPage;
