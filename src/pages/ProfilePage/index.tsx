import { useState, useEffect, useCallback } from 'react';
import Container from "../../components/Container";
import { SubmitHandler, useForm } from 'react-hook-form';
import RegisterInputs, { RegisterInputsKeys } from '../../types/RegisterInput';
import User from '../../types/User';
import { toast } from 'react-toastify';
import { BASE_URL, requestAuthenticatedRequest } from '../../utils/request';
import RoundedImage from '../../components/RoundedImage';


const ProfilePage = () => {

  const { register, handleSubmit, getValues, clearErrors, setError, formState: { errors } } = useForm<RegisterInputs>();
  const [wasSubmit, setWasSubmit] = useState<boolean>(false);
  const [preview, setPreview] = useState<File|null>();
  const [user, setUser] = useState<User>();

  const getDados = useCallback(() => {
    console.log('No useCallback');
    const getDados = async() => {
      try {

        const response = await requestAuthenticatedRequest({
          url: '/users/profile'
        });
        const userData = response.data as User;
        setUser(userData);
        console.log(response.data);
      }
      catch(e) {
        console.log('No catch: ' + e);
        toast.error('Error ao carregar os dados');
      }

    }
    getDados();
  }, []);

  useEffect(() => {
    console.log('No useEffect');
    getDados();
  }, [getDados]);

  const onSubmit: SubmitHandler<RegisterInputs> = async(data) => {
    console.log('On Submit');
    const password = data.password;
    const confirmPassword = data.confirmPassword;
    if(password !== confirmPassword) {
      setError('password', { message: 'Passwords must be the same' });
      setError('confirmPassword', { message: 'Passwords must be the same' });
      return;
    }
    try {
      const formData = new FormData();
      Object.keys(data as RegisterInputs).forEach((key) => {
        formData.append(key, data[key as RegisterInputsKeys]);
      });
      if(preview) {
        formData.append('image', preview);
      }
      console.log('formData', formData);
      await requestAuthenticatedRequest({
        headers: {
          "Content-Type": 'multipart/form-data'
        },
        method: 'PUT',
        url: '/auth/update',
        data: formData
      });
      toast.success('Profile updated with success');
    }
    catch(e) {
      console.error(e);
      toast.error('Erro ao tentar atualizar as informações');
    }

  }

  const getInputClassName = (fieldName: RegisterInputsKeys): string => {
    return wasSubmit ? ((errors[fieldName]?.message) ? 'is-invalid' : 'is-valid') : '';
  }

  const onPasswordChange = () => {
    if(wasSubmit) {
      const password = getValues('password');
      const confirmPassword = getValues('confirmPassword');
      if(password !== confirmPassword) {
        setError('password', { message: 'Password must be the same' });
        setError('confirmPassword', { message: 'Password must be the same' });
      }
      else {
        clearErrors('password');
        clearErrors('confirmPassword');
      }

    }
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if(files) {
      setPreview(files.item(0));
    }
    else {
      setPreview(null);
    }
  }

  const getPreview = () => {
    if((user && user.image) || preview) {
      const url = preview ? URL.createObjectURL(preview) : `${BASE_URL}/imgs/users/${user?.image}`;
      return RoundedImage({
        src: url,
        alt: 'profile'
      });

    }
  }

  return (
    <Container>
      <div className="form-container">
        <header className="text-center">
          <h1>Profile</h1>
          { getPreview() ?? <></> }
        </header>
        { user && (
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label" htmlFor="image">Image</label>
            <input
              type="file"
              name="image"
              id="image"
              className="form-control"
              onChange={onFileChange}
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
              defaultValue={user?.name}
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
              defaultValue={user?.phone}
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
              defaultValue={user?.email}
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
              onKeyUp={onPasswordChange}
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
              onKeyUp={onPasswordChange}
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
        ) }

      </div>
    </Container>
  );
}

export default ProfilePage;
