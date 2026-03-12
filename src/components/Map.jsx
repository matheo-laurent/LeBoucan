// src/components/Map.jsx
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import BadgeIcon from './BadgeIcon.jsx';

const REUNION_CENTER = [-21.115, 55.536];
const REUNION_BOUNDS = [
  [-21.42, 55.2],
  [-20.81, 55.88],
];

function makeBadgeMarkerIcon(badge) {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        position:relative;width:44px;height:44px;border-radius:50%;
        border:3px solid ${badge.earned ? '#fbbf24' : '#d1d5db'};
        background:${badge.earned ? '#fffbeb' : '#f3f4f6'};
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 3px 8px rgba(0,0,0,0.2);
        filter:${badge.earned ? 'none' : 'grayscale(1)'};
      ">
        <img src="${badge.image}" style="width:26px;height:26px;object-fit:contain" alt="${badge.name}" />
        ${badge.earned ? `<span style="position:absolute;top:-4px;right:-4px;background:#10b981;color:white;border-radius:50%;width:14px;height:14px;font-size:8px;display:flex;align-items:center;justify-content:center;">✓</span>` : ''}
      </div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 44],
    popupAnchor: [0, -48],
  });
}

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

function Map({ badges = [], onBadgeClick }) {
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
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <ZoomControl position="bottomright" />

        {/* Badge markers */}
        {badges.map((badge) => (
          <Marker
            key={`badge-${badge.id}`}
            position={[badge.location.latitude, badge.location.longitude]}
            icon={makeBadgeMarkerIcon(badge)}
          >
            <Popup>
              <div style={{ fontFamily: "'Nunito', sans-serif", minWidth: 160, textAlign: 'center' }}>
                <BadgeIcon badge={badge} onClick={() => onBadgeClick?.(badge)} />
                <p style={{ marginTop: 6, fontSize: 11, color: '#6b7280' }}>{badge.activity}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Title overlay */}
      <div
        className="pointer-events-none absolute left-4 top-4 z-[1000] rounded-2xl bg-white/90 px-4 py-2 shadow-lg backdrop-blur-sm"
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        <span className="text-sm font-black text-emerald-800">🌴 La Réunion</span>
      </div>

      {/* Badge legend */}
      <div
        className="absolute bottom-12 left-4 z-[1000] rounded-2xl bg-white/90 px-3 py-2 shadow-lg backdrop-blur-sm"
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        <p className="mb-1 text-[10px] font-black uppercase tracking-wide text-gray-500">Badges</p>
        <div className="flex gap-2 text-[10px]">
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-400" /> Obtenu
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-gray-300" /> Verrouillé
          </span>
        </div>
      </div>
    </div>
  );
}

export default Map;