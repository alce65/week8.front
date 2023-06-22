import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

// import './index.css';
import { App } from './components/app/app';
import { appStore } from './store/store';

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Provider store={appStore}>
        <App></App>
      </Provider>
    </Router>
  </React.StrictMode>
);
