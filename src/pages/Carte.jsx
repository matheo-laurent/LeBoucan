// src/pages/Carte.jsx
import Map from '../components/Map.jsx';

function Carte() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-br from-sky-200 via-teal-100 to-emerald-200 p-6">
      <header className="mb-6 text-center">
        <h1
          className="text-4xl font-black tracking-tight text-emerald-900 drop-shadow"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          Carte de La Réunion
        </h1>
        <p className="mt-1 text-sm font-medium text-emerald-700">
          Cliquez sur un point pour en savoir plus
        </p>
      </header>

      <div className="w-full max-w-3xl flex-1 overflow-hidden rounded-3xl shadow-2xl ring-4 ring-white/60">
        <div className="h-[520px]">
          <Map />
        </div>
      </div>

      <footer className="mt-6 flex flex-wrap justify-center gap-3">
        {[
          { label: 'Ville', color: '#f59e0b', emoji: '🏙️' },
          { label: 'Volcan', color: '#ef4444', emoji: '🌋' },
          { label: 'Cirque', color: '#8b5cf6', emoji: '🏞️' },
          { label: 'Plage', color: '#06b6d4', emoji: '🏖️' },
          { label: 'Village', color: '#f97316', emoji: '🏡' },
        ].map(({ label, color, emoji }) => (
          <div
            key={label}
            className="flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow backdrop-blur-sm"
          >
            <span className="inline-block h-3 w-3 rounded-full border border-white" style={{ backgroundColor: color }} />
            <span>{emoji}</span>
            <span>{label}</span>
          </div>
        ))}
      </footer>
    </main>
  );
}

export default Carte;