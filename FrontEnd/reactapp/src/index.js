import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import config from './config';
import reportWebVitals from './reportWebVitals';
import WalletContext from './enTheme2/WalletContext';

const App = require(`./${config.themeCode}/App`).default;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WalletContext >
      <App />
    </WalletContext>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();