import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../reducers/user.slice';
import { storeName } from '../../config';
import { RootState } from '../../store/store';

import './header.css';

export function Header({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, userData } = useSelector((state: RootState) => state.user);

  const handleUser = () => {
    if (token) {
      runLogout();
    } else {
      navigate('login');
    }
  };

  const handleRegister = () => {
    console.log('Register');
    navigate('register');
  };

  const runLogout = () => {
    dispatch(logout());
    localStorage.removeItem(storeName);
  };

  return (
    <>
      <header>
        <h1>Sample Front</h1>
        <div>
          {token ? (
            <>
              <button onClick={handleUser}>Logout</button>
              <span>Hola, {userData?.userName}</span>
            </>
          ) : (
            <>
              <button onClick={handleRegister}>Register</button>
              <button onClick={handleUser}>Login</button>
            </>
          )}
        </div>
      </header>
      {children}
    </>
  );
}
