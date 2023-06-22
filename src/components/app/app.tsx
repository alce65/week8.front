import { AppRoutes } from '../app.routes/app.routes';
import { Header } from '../header/header';
import { storeName } from '../../config';
import { UserLogged, login } from '../../reducers/user.slice';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { Menu } from '../menu/menu';
import { MenuOptions } from '../../types/menu.options';

export function App() {
  const dispatch = useDispatch();

  const initialLoginCheck = () => {
    const lsString = localStorage.getItem(storeName);
    if (!lsString) return;
    const { token } = JSON.parse(lsString);
    const userData: UserLogged = jwtDecode(token);
    userData.email = '';
    console.log(userData);
    dispatch(login({ token, userData }));
  };

  const menuOptions: MenuOptions = [
    { url: 'home', label: 'Inicio', protected: false },
    { url: 'books', label: 'Books', protected: true },
  ];

  initialLoginCheck();
  return (
    <>
      <Header>
        <Menu options={menuOptions}></Menu>
      </Header>
      <main>
        <AppRoutes></AppRoutes>
      </main>
    </>
  );
}
