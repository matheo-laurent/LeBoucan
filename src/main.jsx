import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import Carte from './pages/Carte.jsx'
import Badges from './pages/Badge.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/LeBoucan">
      <Routes>
        <Route path="/" element={<Carte />}/>
        <Route path="/badges" element={<Badges />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
