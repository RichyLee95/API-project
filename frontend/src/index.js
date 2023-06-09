import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import { ModalProvider,Modal } from './context/Modal';
import * as sessionActions from "./store/session";

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

// if (process.env.NODE_ENV !== 'production') {
//   window.store = store;
// }

function Root() {
  return (
    <ModalProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Modal />
      </BrowserRouter>
    </Provider>
    </ModalProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
