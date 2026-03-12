// src/components/Map.jsx
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Réunion Island center + tight bounds
const REUNION_CENTER = [-21.115, 55.536];
const REUNION_BOUNDS = [
  [-21.42, 55.20], // SW
  [-20.81, 55.88], // NE
];

// Build a custom emoji marker for each POI type
function makeIcon(emoji, color) {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        background:${color};
        width:32px;height:32px;
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        border:2px solid white;
        box-shadow:0 2px 6px rgba(0,0,0,0.25);
        display:flex;align-items:center;justify-content:center;
      ">
        <span style="transform:rotate(45deg);font-size:14px;line-height:1">${emoji}</span>
      </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -36],
  });
}

// Fix Leaflet's missing default icon assets in Vite
function FixLeafletIcons() {
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);
  return null;
}

function Map() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-2xl">
      <FixLeafletIcons />

      <MapContainer
        center={REUNION_CENTER}
        zoom={11}
        minZoom={10}
        maxZoom={15}
        maxBounds={REUNION_BOUNDS}
        maxBoundsViscosity={1.0}
        zoomControl={false}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        {/* OSM tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Custom zoom control bottom-right */}
        <ZoomControl position="bottomright" />
      </MapContainer>

      {/* Title overlay */}
      <div
        className="pointer-events-none absolute left-4 top-4 z-[1000] rounded-2xl bg-white/90 px-4 py-2 shadow-lg backdrop-blur-sm"
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        <span className="text-sm font-black text-emerald-800">🌴 La Réunion</span>
      </div>
    </div>
  );
}

/**
 * Convert normalized [0,1] POI coords back to real lat/lng.
 * nx/ny were defined relative to the island bounding box.
 */
function poiToLatLng(poi) {
  const latMin = -21.42, latMax = -20.81;
  const lngMin = 55.20, lngMax = 55.88;
  const lat = latMax - poi.ny * (latMax - latMin);
  const lng = lngMin + poi.nx * (lngMax - lngMin);
  return [lat, lng];
}

export default Map;