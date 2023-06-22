import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router } from "react-router-dom";
// import { Provider } from "react-redux";
// import { store } from "./core/store/store";

// import './index.css';
import { App } from './components/app/app';

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <React.StrictMode>
    {/* <Router>
      <Provider store={store}>Add App Component...</Provider>
    </Router> */}
    <App></App>
  </React.StrictMode>
);
