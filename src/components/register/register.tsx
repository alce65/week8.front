import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { url } from '../../config';

export function Register() {
  const navigate = useNavigate();

  const register = async (event: SyntheticEvent) => {
    event.preventDefault();
    console.log('Registering');
    const formElement = event.target as HTMLFormElement;
    const formDataRegister = new FormData(formElement);

    for (const obj of formDataRegister) {
      console.log(obj);
    }

    const registerURl = url + '/user/register';
    const response = await fetch(registerURl, {
      method: 'POST',
      body: formDataRegister,
    });
    console.log(response);
    const data = await response.json();
    console.log(data);

    navigate('/home');
  };

  return (
    <section className="register">
      <h2>Register</h2>
      <form className="register-form" onSubmit={register}>
        <div className="form-group">
          <label htmlFor="userName">Nombre</label>
          <input type="text" id="userName" name="userName" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="passwd">Contraseña</label>
          <input
            type="password"
            id="passwd"
            name="passwd"
            required
            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
          />
        </div>
        <div className="form-group">
          <label htmlFor="avatar">Avatar</label>
          <input type="file" id="avatar" name="avatar" />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </section>
  );
}
