// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './themes.css';  // or TaskBoard

const container = document.getElementById('root');
const root = createRoot(container); // ✅ React 18 method
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


