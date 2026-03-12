// src/pages/Carte.jsx
import Map from '../components/Map.jsx';

function Carte() {
  return (
    <main className="flex h-screen w-full flex-col bg-sky-100">
      <div className="flex shrink-0 items-center justify-center gap-6 bg-white/60 py-2 text-xs font-medium text-sky-800 backdrop-blur-sm">
        <span>Cliquer-glisser pour tourner</span>
        <span>Molette pour zoomer</span>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <Map />
      </div>
    </main>
  );
}

export default Carte;