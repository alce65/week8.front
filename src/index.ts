const url = 'http://localhost:4400';
const storeName = 'Sample';

function main() {
  console.log('Loaded');

  let state: any = {};

  const formLoginElement = document.querySelector('form.login-form');
  const formRegisterElement: HTMLFormElement =
    document.querySelector('form.register-form')!;
  const logoutElement = document.querySelector('.logout');
  const buttonElement = document.querySelector('.show-button');

  const store = localStorage.getItem(storeName);
  if (store) {
    state.token = JSON.parse(store).token;
    formLoginElement?.setAttribute('hidden', 'true');
    logoutElement?.removeAttribute('hidden');
  } else {
    formLoginElement?.removeAttribute('hidden');
    logoutElement?.setAttribute('hidden', 'true');
  }

  const logout = () => {
    localStorage.removeItem(storeName);
    state = {};
    formLoginElement?.removeAttribute('hidden');
    logoutElement?.setAttribute('hidden', 'true');
  };

  const handleClick = async () => {
    if (!state.token) return;
    const urlBooks = url + '/book';
    const response = await fetch(urlBooks, {
      headers: {
        Authorization: 'Bearer ' + state.token,
      },
    });
    const result = await response.json();
    console.log(result);
  };

  formLoginElement!.addEventListener('submit', login);
  formRegisterElement!.addEventListener('submit', register);
  buttonElement?.addEventListener('click', handleClick);
  logoutElement?.addEventListener('click', logout);
}

document.addEventListener('DOMContentLoaded', main);
