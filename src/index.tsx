import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/styles/index.css';
import App from 'App';
import Store from 'helpers/Store';

const cached = new Store().getState();

ReactDOM.render(
  <React.StrictMode>
    <App cached={cached} />
  </React.StrictMode>,
  document.getElementById('root')
);
