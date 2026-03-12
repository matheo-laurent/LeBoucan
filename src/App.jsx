import { Routes, Route } from "react-router-dom";
import Plant from "./companion.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1 className="text-3xl font-bold text-center text-gray-800">LeBoucan</h1>} />
      <Route path="/plant" element={<Plant />} />
    </Routes>
  );
}

export default App;