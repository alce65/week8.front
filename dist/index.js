"use strict";
const url = 'http://localhost:4400';
const storeName = 'Sample';
function main() {
    console.log('Loaded');
    let state = {};
    const formLoginElement = document.querySelector('form.login-form');
    const formRegisterElement = document.querySelector('form.register-form');
    const logoutElement = document.querySelector('.logout');
    const buttonElement = document.querySelector('.show-button');
    const store = localStorage.getItem(storeName);
    if (store) {
        state.token = JSON.parse(store).token;
        formLoginElement?.setAttribute('hidden', 'true');
        logoutElement?.removeAttribute('hidden');
    }
    else {
        formLoginElement?.removeAttribute('hidden');
        logoutElement?.setAttribute('hidden', 'true');
    }
    const register = (event) => {
        event.preventDefault();
        console.log('Registering');
        const formDataRegister = new FormData(formRegisterElement);
        // Temp
        // const file = formDataRegister.get('avatar');
        // console.log(file);
        // const f: HTMLInputElement = formRegisterElement.elements.namedItem(
        //   'avatar'
        // ) as HTMLInputElement;
        // formDataRegister.append('file', f.files![0]);
        for (const obj of formDataRegister) {
            console.log(obj);
        }
        const registerURl = url + '/user/register';
        fetch(registerURl, {
            method: 'POST',
            body: formDataRegister,
        });
    };
    const login = async (event) => {
        event.preventDefault();
        const { elements } = event.target;
        const data = {
            user: elements.namedItem('user').value,
            passwd: elements.namedItem('passwd').value,
        };
        const urlLogin = url + '/user/login';
        const response = await fetch(urlLogin, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        state = await response.json();
        localStorage.setItem(storeName, JSON.stringify({ token: state.token }));
        formLoginElement?.setAttribute('hidden', 'true');
        logoutElement?.removeAttribute('hidden');
        console.log(state);
    };
    const logout = () => {
        localStorage.removeItem(storeName);
        state = {};
        formLoginElement?.removeAttribute('hidden');
        logoutElement?.setAttribute('hidden', 'true');
    };
    const handleClick = async () => {
        if (!state.token)
            return;
        const urlBooks = url + '/book';
        const response = await fetch(urlBooks, {
            headers: {
                Authorization: 'Bearer ' + state.token,
            },
        });
        const result = await response.json();
        console.log(result);
    };
    formLoginElement.addEventListener('submit', login);
    formRegisterElement.addEventListener('submit', register);
    buttonElement?.addEventListener('click', handleClick);
    logoutElement?.addEventListener('click', logout);
}
document.addEventListener('DOMContentLoaded', main);
