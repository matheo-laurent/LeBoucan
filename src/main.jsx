import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Navbar from './components/Navbar.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/LeBoucan">
      <Navbar />
      <App />
    </BrowserRouter>
  </StrictMode>,
);
