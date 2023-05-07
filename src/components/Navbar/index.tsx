import { NavLink, useNavigate } from 'react-router-dom';
import LogoImage from '../../assets/imgs/logo.png';
import './styles.css';
import useAuthContext from '../../hooks/useAuthContext';
import { removeAuthData } from '../../utils/storage';

const Navbar = () => {

  console.log('A navbar renderizou');
  const { authContextData, setAuthContextData } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = (event: React.MouseEvent) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false
    });
    navigate('/auth/login', {
      replace: true
    });
  }

  return (
    <nav className="navbar navbar-expand-lg secondary-bg-color" data-bs-theme="dark">
    <div className="container">
      <NavLink className="navbar-brand" to="/">
        <img src={LogoImage} className="img-fluid" alt="Get a Pet logo"/>
        <span>Get a Pet</span>
      </NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarItems" aria-controls="navbarItems" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarItems">
        <ul className="navbar-nav mb-0">
          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/pets">Pets</NavLink>
          </li>
        </ul>
        <ul className="navbar-nav mb-2 mb-lg-0">
          { authContextData.authenticated ?
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="#" id="user-link">{ authContextData.tokenData?.username }</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="auth/logout" onClick={handleLogout}>Logout</NavLink>
              </li>
            </>
            :
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="auth/login">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="auth/register">Register</NavLink>
              </li>
            </>
          }
        </ul>
      </div>
    </div>
  </nav>
  );
}

export default Navbar;
