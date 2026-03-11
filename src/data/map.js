// src/data/map.js
// Geographic + elevation data for the 3D Réunion Island map

// Accurate GeoJSON-derived outline of Réunion Island
// Coordinates in normalized [0,1] space — origin bottom-left
export const ISLAND_OUTLINE = [
  // Starting from NW tip, going clockwise
  [0.18, 0.82], // Pointe des Galets (NW)
  [0.25, 0.88], // Saint-Denis area N coast
  [0.34, 0.92], // Sainte-Marie
  [0.44, 0.93], // Saint-André
  [0.54, 0.91], // Saint-Benoît
  [0.62, 0.88], // Sainte-Rose
  [0.70, 0.82], // Pointe de la Table (NE)
  [0.78, 0.73], // Saint-Philippe SE coast
  [0.84, 0.62], // Pointe du Tremblet
  [0.88, 0.50], // SE tip
  [0.86, 0.38], // Pointe de Langevin
  [0.80, 0.27], // Saint-Joseph
  [0.72, 0.18], // Saint-Pierre
  [0.62, 0.12], // Petite-Île
  [0.50, 0.08], // Saint-Louis / Étang-Salé
  [0.40, 0.08], // Saint-Leu
  [0.30, 0.10], // Les Avirons
  [0.20, 0.14], // Saint-Gilles
  [0.12, 0.20], // La Saline
  [0.06, 0.30], // Saint-Paul (W coast)
  [0.03, 0.42], // Le Port
  [0.02, 0.54], // La Possession
  [0.05, 0.66], // West coast near Saint-Denis
  [0.10, 0.76], // Approaching NW
  [0.18, 0.82],
];

export const ELEVATION_ZONES = [
  {
    id: 'coast-low', label: 'Côtes',
    height: 0.04, color: '#86efac', sideColor: '#4ade80',
    points: null,
  },
  {
    id: 'interior', label: 'Intérieur',
    height: 0.12, color: '#4ade80', sideColor: '#16a34a',
    points: [
      [0.22, 0.76], [0.30, 0.83], [0.40, 0.86], [0.50, 0.85],
      [0.60, 0.81], [0.68, 0.74], [0.74, 0.63], [0.76, 0.50],
      [0.73, 0.37], [0.66, 0.26], [0.55, 0.18], [0.43, 0.15],
      [0.32, 0.17], [0.22, 0.24], [0.14, 0.35], [0.10, 0.48],
      [0.11, 0.60], [0.15, 0.70], [0.22, 0.76],
    ],
  },
  {
    id: 'mid-highlands', label: 'Mi-hauteurs',
    height: 0.22, color: '#22c55e', sideColor: '#15803d',
    points: [
      [0.26, 0.70], [0.33, 0.77], [0.43, 0.79], [0.53, 0.76],
      [0.62, 0.68], [0.66, 0.56], [0.64, 0.43], [0.57, 0.33],
      [0.45, 0.27], [0.33, 0.29], [0.24, 0.38], [0.22, 0.52],
      [0.24, 0.63], [0.26, 0.70],
    ],
  },
  {
    id: 'hauts', label: 'Les Hauts',
    height: 0.35, color: '#a3e635', sideColor: '#4d7c0f',
    points: [
      [0.30, 0.64], [0.36, 0.71], [0.45, 0.72], [0.54, 0.67],
      [0.59, 0.57], [0.57, 0.45], [0.49, 0.36], [0.37, 0.34],
      [0.28, 0.41], [0.27, 0.55], [0.30, 0.64],
    ],
  },
  {
    id: 'cirques', label: 'Cirques',
    height: 0.50, color: '#bef264', sideColor: '#65a30d',
    points: [
      [0.32, 0.60], [0.36, 0.67], [0.43, 0.69], [0.51, 0.65],
      [0.55, 0.56], [0.53, 0.46], [0.45, 0.40], [0.35, 0.40],
      [0.29, 0.47], [0.29, 0.56], [0.32, 0.60],
    ],
  },
  {
    id: 'fournaise-base', label: 'Massif de la Fournaise',
    height: 0.38, color: '#fdba74', sideColor: '#ea580c',
    points: [
      [0.56, 0.30], [0.62, 0.36], [0.70, 0.34], [0.74, 0.26],
      [0.72, 0.17], [0.64, 0.12], [0.55, 0.14], [0.50, 0.22],
      [0.52, 0.28], [0.56, 0.30],
    ],
  },
  {
    id: 'fournaise-cone', label: 'Piton de la Fournaise',
    height: 0.58, color: '#f97316', sideColor: '#b45309',
    points: [
      [0.60, 0.25], [0.64, 0.30], [0.70, 0.28], [0.72, 0.22],
      [0.69, 0.16], [0.62, 0.14], [0.57, 0.18], [0.58, 0.24],
      [0.60, 0.25],
    ],
  },
  {
    id: 'piton-neiges', label: 'Piton des Neiges',
    height: 0.80, color: '#f0fdf4', sideColor: '#6d28d9',
    points: [
      [0.36, 0.57], [0.39, 0.63], [0.44, 0.64], [0.49, 0.60],
      [0.49, 0.53], [0.44, 0.49], [0.37, 0.50], [0.35, 0.54],
      [0.36, 0.57],
    ],
  },
];

export const POIS = [
  { id: 'saint-denis',  label: 'Saint-Denis',          type: 'city',    nx: 0.26, ny: 0.86, emoji: '🏙️', description: 'Capitale — 150 000 hab.' },
  { id: 'saint-pierre', label: 'Saint-Pierre',          type: 'city',    nx: 0.62, ny: 0.14, emoji: '🌆', description: 'Capitale du Sud' },
  { id: 'saint-paul',   label: 'Saint-Paul',            type: 'city',    nx: 0.08, ny: 0.36, emoji: '🏘️', description: 'Sous-préfecture Ouest' },
  { id: 'saint-gilles', label: 'Saint-Gilles',          type: 'beach',   nx: 0.16, ny: 0.22, emoji: '🏖️', description: 'Boucan Canot — plage mythique' },
  { id: 'piton-neiges', label: 'Piton des Neiges',      type: 'peak',    nx: 0.42, ny: 0.57, emoji: '🏔️', description: '3 071 m — point culminant' },
  { id: 'fournaise',    label: 'Piton de la Fournaise', type: 'volcano', nx: 0.65, ny: 0.22, emoji: '🌋', description: '2 632 m — volcan actif' },
  { id: 'cilaos',       label: 'Cilaos',                type: 'cirque',  nx: 0.42, ny: 0.44, emoji: '🏞️', description: 'Cirque de Cilaos' },
  { id: 'mafate',       label: 'Mafate',                type: 'cirque',  nx: 0.30, ny: 0.55, emoji: '🏕️', description: 'Cirque inaccessible en voiture' },
  { id: 'salazie',      label: 'Salazie',               type: 'cirque',  nx: 0.44, ny: 0.66, emoji: '🌿', description: 'Hell-Bourg — plus beau village' },
];

export const POI_TYPE_COLORS = {
  city: '#f59e0b', beach: '#06b6d4', peak: '#818cf8',
  volcano: '#ef4444', cirque: '#8b5cf6', village: '#f97316',
};

export const CAMERA = {
  fov: 40, near: 0.1, far: 100,
  position: [0, 2.8, 2.2],
  target: [0, 0.1, 0],
};

export const LIGHTS = {
  ambient: { color: 0xfff4e0, intensity: 0.7 },
  sun:     { color: 0xffe8a0, intensity: 1.4, position: [3, 8, 4] },
  fill:    { color: 0xc7e8ff, intensity: 0.4, position: [-5, 2, -2] },
  rim:     { color: 0xffd0a0, intensity: 0.3, position: [0, -2, -5] },
};

export const SCENE_COLORS = {
  ocean: 0x38bdf8, oceanEdge: 0x0ea5e9,
  fog: 0xdbeafe, sky: '#dbeafe',
};

export const OCEAN_RINGS = [1.35, 1.55, 1.80];