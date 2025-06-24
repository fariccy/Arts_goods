// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // ✅ Must match file name and default export

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
