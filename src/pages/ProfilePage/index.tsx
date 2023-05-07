import { useState } from 'react';
import Container from "../../components/Container";
import { useForm } from 'react-hook-form';
import RegisterInputs, { RegisterInputsKeys } from '../../types/RegisterInput';


const ProfilePage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInputs>();
  const [wasSubmit, setWasSubmit] = useState<boolean>(false);

  const getInputClassName = (fieldName: RegisterInputsKeys): string => {
    return wasSubmit ? ((errors[fieldName]?.message) ? 'is-invalid' : 'is-valid') : '';
  }

  return (
    <Container>
      <div className="form-container">
        <header className="text-center">
          <h1>Profile</h1>
          <p>Image preview</p>
        </header>
        <form>
          <div className="mb-3">
            <label className="form-label" htmlFor="image">Image</label>
            <input
              type="file"
              name="image"
              id="image"
              className="form-control"
            />
          </div>
          <div className="mb-3">
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
      </div>
    </Container>
  );
}

export default ProfilePage;
