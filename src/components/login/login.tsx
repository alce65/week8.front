import { SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../reducers/user.slice';
import { useNavigate } from 'react-router-dom';
import { url, storeName } from '../../config';

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event: SyntheticEvent) => {
    event.preventDefault();

    const { elements } = event.target! as HTMLFormElement;

    const data = {
      user: (elements.namedItem('user') as HTMLFormElement).value,
      passwd: (elements.namedItem('passwd') as HTMLFormElement).value,
    };

    const urlLogin = url + '/user/login';
    const response = await fetch(urlLogin, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const state = await response.json();

    console.log(state);

    state.userData = state.user;
    delete state.user;
    dispatch(login(state));
    console.log('Logged');
    localStorage.setItem(storeName, JSON.stringify({ token: state.token }));
    navigate('/home');
  };

  return (
    <section className="login">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="user">Nombre o email</label>
          <input type="text" id="user" name="user" />
        </div>
        <div className="form-group">
          <label htmlFor="passwd">Contraseña</label>
          <input type="password" id="passwd" name="passwd" />
        </div>
        <button type="submit">Enviar</button>
        <button>Cancelar</button>
      </form>
    </section>
  );
}
