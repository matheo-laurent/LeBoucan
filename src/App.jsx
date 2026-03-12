import { Routes, Route } from "react-router-dom";
import Plant from "./companion.jsx";
import Carte from './pages/Carte.jsx';
import Badges from './pages/Badge.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Carte />} />
      <Route path="/badges" element={<Badges />} />
      <Route path="/plant" element={<Plant />} />
    </Routes>
  );
}

export default App;