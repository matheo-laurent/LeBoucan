// src/components/Map.jsx
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Réunion Island center + tight bounds
const REUNION_CENTER = [-21.115, 55.536];
const REUNION_BOUNDS = [
  [-21.42, 55.2], // SW
  [-20.81, 55.88], // NE
];

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

export default Map;
