import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Carte from './pages/Carte.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/LeBoucan">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Carte" element={<Carte />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
