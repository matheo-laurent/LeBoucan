// src/data/map.js
// All raw data for the Réunion Island cartoon map

export const ISLAND_PATH =
  'M260,40 C280,35 310,38 335,50 C365,65 390,85 405,110 C420,135 425,160 420,185 C415,210 400,230 385,248 C365,270 340,282 315,290 C290,298 262,300 238,295 C210,288 185,272 165,252 C142,230 128,202 122,175 C115,145 118,112 132,88 C148,62 175,48 200,42 C220,37 242,42 260,40 Z';

export const REGIONS = [
  { id: 'nord', label: 'Nord', color: '#4ade80', shadowColor: '#16a34a', cx: 280, cy: 100 },
  { id: 'est', label: 'Est', color: '#34d399', shadowColor: '#059669', cx: 370, cy: 175 },
  { id: 'sud', label: 'Sud', color: '#86efac', shadowColor: '#22c55e', cx: 280, cy: 265 },
  { id: 'ouest', label: 'Ouest', color: '#6ee7b7', shadowColor: '#10b981', cx: 165, cy: 175 },
  { id: 'hauteurs', label: 'Hauts', color: '#a78bfa', shadowColor: '#7c3aed', cx: 270, cy: 185 },
];

export const POIS = [
  { id: 'saint-denis', label: 'Saint-Denis', type: 'city', x: 268, y: 78, emoji: '🏙️', description: 'Capitale de La Réunion' },
  { id: 'piton-neiges', label: 'Piton des Neiges', type: 'volcano', x: 248, y: 168, emoji: '🏔️', description: 'Point culminant — 3 071 m' },
  { id: 'piton-fournaise', label: 'Piton de la Fournaise', type: 'volcano', x: 340, y: 220, emoji: '🌋', description: 'Volcan actif — 2 632 m' },
  { id: 'cilaos', label: 'Cilaos', type: 'cirque', x: 232, y: 210, emoji: '🏞️', description: 'Cirque de Cilaos' },
  { id: 'mafate', label: 'Mafate', type: 'cirque', x: 198, y: 155, emoji: '🏕️', description: 'Cirque de Mafate — inaccessible en voiture' },
  { id: 'salazie', label: 'Salazie', type: 'cirque', x: 298, y: 138, emoji: '🌿', description: 'Cirque de Salazie' },
  { id: 'saint-pierre', label: 'Saint-Pierre', type: 'city', x: 258, y: 268, emoji: '🌊', description: 'Capitale du Sud' },
  { id: 'hell-bourg', label: 'Hell-Bourg', type: 'village', x: 308, y: 148, emoji: '🏡', description: 'Plus beau village de France' },
  { id: 'saint-gilles', label: 'Saint-Gilles', type: 'beach', x: 148, y: 162, emoji: '🏖️', description: 'Plage de Boucan Canot' },
  { id: 'saint-philippe', label: 'Saint-Philippe', type: 'city', x: 355, y: 252, emoji: '🌺', description: 'Porte du volcan' },
];

export const POI_TYPE_COLORS = {
  city: '#f59e0b',
  volcano: '#ef4444',
  cirque: '#8b5cf6',
  beach: '#06b6d4',
  village: '#f97316',
};

export const MAP_COLORS = {
  ocean: '#bae6fd',
  oceanDeep: '#7dd3fc',
  islandBase: '#4ade80',
  relief: '#a78bfa',
  shadow: '#16a34a',
  reefRing: '#67e8f9',
};

export const DECORATIONS = [
  { id: 'wave1', x: 80, y: 120, label: '🐋' },
  { id: 'wave2', x: 430, y: 140, label: '🐠' },
  { id: 'wave3', x: 160, y: 300, label: '🐢' },
  { id: 'wave4', x: 380, y: 295, label: '⛵' },
  { id: 'cloud1', x: 95, y: 65, label: '☁️' },
  { id: 'cloud2', x: 400, y: 55, label: '☁️' },
];