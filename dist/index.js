import { app } from './app.js';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
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
    const register = async (event) => {
        event.preventDefault();
        console.log('Registering');
        const data = {
            userName: formRegisterElement.elements.namedItem('userName').value,
            email: formRegisterElement.elements.namedItem('email').value,
            passwd: formRegisterElement.elements.namedItem('passwd').value,
            avatar: '',
        };
        const fileInput = formRegisterElement.elements.namedItem('avatar');
        const file = fileInput.files[0];
        const storage = getStorage(app);
        const storageRef = ref(storage, 'avatar');
        const uploaded = await uploadBytes(storageRef, file);
        console.log(uploaded.metadata);
        data.avatar = uploaded.metadata.fullPath;
        console.log(data);
        // TEMP
        // const registerURl = url + '/user/register';
        // fetch(registerURl, {
        //   method: 'POST',
        //   headers: {'Content-type': 'application/json'},
        //   body: JSON.stringify(data),
        // });
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
