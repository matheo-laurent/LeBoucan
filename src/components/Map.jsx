// src/components/Map.jsx
import { useState } from 'react';
import { ISLAND_PATH, POIS, POI_TYPE_COLORS, MAP_COLORS, DECORATIONS } from '../data/map.js';

function Map() {
  const [activePoi, setActivePoi] = useState(null);

  const handlePoiClick = (poi) => {
    setActivePoi(activePoi?.id === poi.id ? null : poi);
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {activePoi && (
        <div
          className="absolute left-4 top-4 z-20 max-w-[200px] rounded-2xl border-2 border-white bg-white/90 p-3 shadow-xl backdrop-blur-sm"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          <div className="text-2xl">{activePoi.emoji}</div>
          <div className="mt-1 text-sm font-bold text-gray-800">{activePoi.label}</div>
          <div className="mt-0.5 text-xs text-gray-500">{activePoi.description}</div>
          <button
            onClick={() => setActivePoi(null)}
            className="mt-2 text-xs text-gray-400 underline hover:text-gray-600"
          >
            Fermer
          </button>
        </div>
      )}

      <svg
        viewBox="0 0 540 360"
        className="h-full w-full"
        style={{ filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.18))' }}
        aria-label="Carte 3D cartoon de La Réunion"
      >
        <defs>
          <radialGradient id="oceanGrad" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor={MAP_COLORS.ocean} />
            <stop offset="100%" stopColor={MAP_COLORS.oceanDeep} />
          </radialGradient>
          <radialGradient id="islandGrad" cx="38%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#bbf7d0" />
            <stop offset="45%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#15803d" />
          </radialGradient>
          <radialGradient id="reliefGrad" cx="45%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#e9d5ff" />
            <stop offset="60%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#6d28d9" />
          </radialGradient>
          <filter id="islandShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="6" dy="8" stdDeviation="6" floodColor="#065f46" floodOpacity="0.35" />
          </filter>
          <filter id="volcanoGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="540" height="360" fill="url(#oceanGrad)" rx="16" />

        {[1, 2, 3].map((i) => (
          <ellipse
            key={i}
            cx={270} cy={180}
            rx={230 + i * 18} ry={155 + i * 12}
            fill="none" stroke="white" strokeWidth={1}
            strokeDasharray="6 10" opacity={0.18 - i * 0.04}
          />
        ))}

        <path
          d={ISLAND_PATH}
          transform="translate(0,0) scale(1.08) translate(-18,-12)"
          fill="none" stroke={MAP_COLORS.reefRing}
          strokeWidth={7} strokeDasharray="4 6" opacity={0.55}
        />

        <path d={ISLAND_PATH} transform="translate(9,10)" fill="#065f46" opacity={0.22} />

        <path
          d={ISLAND_PATH}
          fill="url(#islandGrad)" stroke="white"
          strokeWidth={2.5} filter="url(#islandShadow)"
        />

        <ellipse cx={262} cy={178} rx={68} ry={55}
          fill="url(#reliefGrad)" opacity={0.72}
          style={{ mixBlendMode: 'multiply' }}
        />

        <ellipse cx={338} cy={218} rx={32} ry={24}
          fill="#f97316" opacity={0.5} filter="url(#volcanoGlow)"
        />
        <ellipse cx={338} cy={212} rx={14} ry={10} fill="#ef4444" opacity={0.85} />

        {DECORATIONS.map((d) => (
          <text key={d.id} x={d.x} y={d.y} fontSize={18} textAnchor="middle" opacity={0.7}>
            {d.label}
          </text>
        ))}

        <g transform="translate(488,42)">
          <circle r={18} fill="white" opacity={0.85} />
          <text textAnchor="middle" y={-6} fontSize={9} fontWeight="bold" fill="#1e3a5f">N</text>
          <text textAnchor="middle" y={14} fontSize={9} fill="#64748b">S</text>
          <text textAnchor="start" x={6} y={4} fontSize={9} fill="#64748b">E</text>
          <text textAnchor="end" x={-6} y={4} fontSize={9} fill="#64748b">O</text>
          <polygon points="0,-12 3,-2 0,0 -3,-2" fill="#ef4444" />
          <polygon points="0,12 3,2 0,0 -3,2" fill="#94a3b8" />
        </g>

        <g transform="translate(32,330)">
          <rect width={60} height={5} rx={2} fill="white" opacity={0.7} />
          <rect width={30} height={5} rx={2} fill="#1e3a5f" opacity={0.6} />
          <text y={16} fontSize={8} fill="white" opacity={0.8}>0 25 km</text>
        </g>

        {POIS.map((poi) => {
          const color = POI_TYPE_COLORS[poi.type] ?? '#f59e0b';
          const isActive = activePoi?.id === poi.id;
          return (
            <g
              key={poi.id}
              transform={`translate(${poi.x},${poi.y})`}
              style={{ cursor: 'pointer' }}
              onClick={() => handlePoiClick(poi)}
              role="button"
              aria-label={poi.label}
            >
              <ellipse cx={0} cy={16} rx={6} ry={3} fill="black" opacity={0.15} />
              <circle r={isActive ? 11 : 9} fill={color} stroke="white" strokeWidth={2}
                style={{ transition: 'r 0.15s' }}
              />
              <text textAnchor="middle" y={5} fontSize={isActive ? 11 : 9}>{poi.emoji}</text>
              <text
                y={24} textAnchor="middle" fontSize={7.5}
                fontWeight="bold" fill="white"
                stroke="#1e3a5f" strokeWidth={2.5} paintOrder="stroke"
                style={{ fontFamily: "'Nunito', sans-serif", pointerEvents: 'none' }}
              >
                {poi.label}
              </text>
            </g>
          );
        })}

        <g transform="translate(20,18)">
          <rect width={155} height={28} rx={8} fill="white" opacity={0.85} />
          <text x={10} y={19} fontSize={13} fontWeight="bold" fill="#065f46"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            🌴 La Réunion
          </text>
        </g>
      </svg>
    </div>
  );
}

export default Map;