import { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, ZoomControl, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const REUNION_CENTER = [-21.115, 55.536];
const REUNION_BOUNDS = [
  [-21.42, 55.2],
  [-20.81, 55.88],
];

const C = {
  terre: '#2D4A2D',
  mousse: '#4A7A4A',
  feuille: '#7AB87A',
  brume: '#B8D4B8',
  sable: '#F2EDE4',
  ocre: '#C47A3A',
  corail: '#D95F3B',
  nuit: '#1A2A1A',
};

const CATEGORIES = ['Nature', 'Culture', 'Randonnée', 'Famille', 'Gastronomie', 'Nettoyage'];
const CATEGORY_STYLES = {
  Nature: { border: '#7AB87A', background: '#E9F6E9' },
  Culture: { border: '#C47A3A', background: '#F8EDE0' },
  Randonnée: { border: '#4A7A4A', background: '#E5F1E5' },
  Famille: { border: '#D95F3B', background: '#FBE8E2' },
  Gastronomie: { border: '#8B5A2B', background: '#F5E9DA' },
  Nettoyage: { border: '#1A2A1A', background: '#E8ECE8' },
};

function makeEventMarkerIcon(eventItem) {
  const style = CATEGORY_STYLES[eventItem.category] ?? {
    border: C.ocre,
    background: C.sable,
  };

  return L.divIcon({
    className: '',
    html: `
			<div style="
				position:relative;width:44px;height:44px;border-radius:50%;
				border:3px solid ${style.border};
				background:${style.background};
				display:flex;align-items:center;justify-content:center;
				box-shadow:0 3px 8px rgba(0,0,0,0.2);
			">
				<span style="
					font-size:18px;line-height:1;color:${style.border};
					font-weight:700;font-family:'DM Sans', sans-serif;
				">★</span>
				<span style="
					position:absolute;bottom:-6px;right:-6px;
					background:${style.border};color:white;border-radius:999px;
					padding:2px 6px;font-size:9px;font-weight:700;
					font-family:'DM Sans', sans-serif;
					box-shadow:0 2px 6px rgba(0,0,0,0.2);
				">${eventItem.category}</span>
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

function MapClickHandler({ enabled, onPick }) {
  useMapEvents({
    click: (event) => {
      if (!enabled) return;
      onPick(event.latlng);
    },
  });
  return null;
}

function formatCoord(value) {
  return value.toFixed(5);
}

function EventCreator() {
  const mapRef = useRef(null);
  const [creationActive, setCreationActive] = useState(true);
  const [events, setEvents] = useState([]);
  const [draft, setDraft] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleMapPick = (latlng) => {
    setDraft({
      id: `evt-${Date.now()}`,
      name: '',
      description: '',
      date: '',
      time: '',
      category: CATEGORIES[0],
      access: 'Gratuit',
      position: latlng,
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!draft?.name?.trim()) return;
    setEvents((prev) => [draft, ...prev]);
    setModalOpen(false);
    setDraft(null);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setDraft(null);
  };

  const handleFocusEvent = (eventItem) => {
    if (!mapRef.current) return;
    mapRef.current.flyTo(eventItem.position, 13, { duration: 0.8 });
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center p-3 lg:p-5"
      style={{ backgroundColor: C.sable }}
    >
      <header className="mb-3 text-center lg:mb-4">
        <p
          className="text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ color: C.ocre, fontFamily: "'Space Mono', monospace" }}
        >
          Administration — La Réunion
        </p>
        <h1
          className="mt-0.5 text-2xl font-bold lg:text-3xl"
          style={{ fontFamily: "'Playfair Display', serif", color: C.terre }}
        >
          Création d'événements
        </h1>
      </header>

      <div className="flex w-full max-w-[1400px] flex-col gap-3 lg:flex-row lg:items-stretch">
        <aside
          className="flex w-full flex-col gap-3 rounded-2xl p-4 shadow-lg lg:w-72 lg:shrink-0"
          style={{ backgroundColor: 'rgba(242,237,228,0.92)', fontFamily: "'DM Sans', sans-serif" }}
        >
          <div>
            <p
              className="text-[11px] font-bold uppercase tracking-widest"
              style={{ color: C.ocre, fontFamily: "'Space Mono', monospace" }}
            >
              Menu
            </p>
            <h2 className="mt-1 text-lg font-bold" style={{ color: C.terre }}>
              Mode création
            </h2>
            <p className="mt-1 text-xs" style={{ color: C.nuit, opacity: 0.65 }}>
              Cliquez sur la carte pour placer un événement puis renseignez les détails.
            </p>
          </div>

          <button
            onClick={() => setCreationActive((prev) => !prev)}
            className="rounded-2xl px-3 py-2 text-sm font-bold text-white shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundColor: creationActive ? C.feuille : C.brume, color: C.nuit }}
          >
            {creationActive ? 'Mode création actif' : 'Mode création en pause'}
          </button>

          <div className="mt-2">
            <p
              className="text-[11px] font-bold uppercase tracking-widest"
              style={{ color: C.ocre, fontFamily: "'Space Mono', monospace" }}
            >
              Événements
            </p>
            {events.length === 0 ? (
              <p className="mt-2 text-xs" style={{ color: C.nuit, opacity: 0.6 }}>
                Aucun événement pour l'instant. Ajoutez-en un en cliquant sur la carte.
              </p>
            ) : (
              <ul className="mt-2 flex flex-col gap-2">
                {events.map((eventItem) => (
                  <li
                    key={eventItem.id}
                    className="cursor-pointer rounded-xl border px-3 py-2 transition hover:shadow"
                    style={{ borderColor: C.brume, backgroundColor: 'rgba(255,255,255,0.5)' }}
                    onClick={() => handleFocusEvent(eventItem)}
                  >
                    <p className="text-sm font-semibold" style={{ color: C.terre }}>
                      {eventItem.name}
                    </p>
                    <p className="text-[11px]" style={{ color: C.nuit, opacity: 0.6 }}>
                      {eventItem.date || 'Date à définir'}{' '}
                      {eventItem.time ? `- ${eventItem.time}` : ''}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        <div
          className="min-w-0 flex-1 overflow-hidden rounded-3xl shadow-xl"
          style={{ outline: `3px solid ${C.brume}` }}
        >
          <div className="h-[460px] sm:h-[560px] lg:h-full lg:min-h-[640px]">
            <div className="relative h-full w-full overflow-hidden rounded-3xl">
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
                whenCreated={(map) => {
                  mapRef.current = map;
                }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <ZoomControl position="bottomright" />
                <MapClickHandler enabled={creationActive} onPick={handleMapPick} />

                {events.map((eventItem) => (
                  <Marker
                    key={eventItem.id}
                    position={[eventItem.position.lat, eventItem.position.lng]}
                    icon={makeEventMarkerIcon(eventItem)}
                  >
                    <Popup>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", minWidth: 180 }}>
                        <p className="text-sm font-bold" style={{ color: C.terre }}>
                          {eventItem.name}
                        </p>
                        <p className="mt-1 text-xs" style={{ color: C.nuit, opacity: 0.7 }}>
                          {eventItem.description || 'Aucune description'}
                        </p>
                        <p className="mt-2 text-[11px]" style={{ color: C.mousse }}>
                          {eventItem.category} · {eventItem.access}
                        </p>
                        <p className="mt-1 text-[11px]" style={{ color: C.nuit, opacity: 0.6 }}>
                          {eventItem.date || 'Date à définir'}{' '}
                          {eventItem.time ? `- ${eventItem.time}` : ''}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>

              <div
                className="pointer-events-none absolute left-4 top-4 z-[1000] rounded-2xl bg-white/90 px-4 py-2 shadow-lg backdrop-blur-sm"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <span className="text-sm font-black" style={{ color: C.terre }}>
                  Zone d'événements
                </span>
                <p className="text-[10px]" style={{ color: C.nuit, opacity: 0.6 }}>
                  Cliquez pour ajouter un point
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modalOpen && draft && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(29,42,29,0.55)' }}
          onClick={handleCancel}
        >
          <div
            className="relative mx-4 w-full max-w-lg rounded-3xl p-6 shadow-2xl"
            style={{ backgroundColor: C.sable, fontFamily: "'DM Sans', sans-serif" }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={handleCancel}
              className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold transition hover:opacity-80"
              style={{ backgroundColor: C.brume, color: C.terre }}
            >
              ✕
            </button>

            <h2
              className="text-lg font-bold"
              style={{ fontFamily: "'Playfair Display', serif", color: C.terre }}
            >
              Nouvel événement
            </h2>
            <p className="mt-1 text-xs" style={{ color: C.nuit, opacity: 0.6 }}>
              Coordonnées: {formatCoord(draft.position.lat)}, {formatCoord(draft.position.lng)}
            </p>

            <div className="mt-4 grid gap-3">
              <label className="text-xs font-semibold" style={{ color: C.terre }}>
                Nom de l'événement
                <input
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                  style={{ borderColor: C.brume }}
                  value={draft.name}
                  onChange={(event) => setDraft((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="Atelier nettoyage plage"
                />
              </label>

              <label className="text-xs font-semibold" style={{ color: C.terre }}>
                Description
                <textarea
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                  style={{ borderColor: C.brume }}
                  rows={3}
                  value={draft.description}
                  onChange={(event) =>
                    setDraft((prev) => ({ ...prev, description: event.target.value }))
                  }
                  placeholder="Décrivez l'activité, les besoins, les objectifs..."
                />
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-xs font-semibold" style={{ color: C.terre }}>
                  Date
                  <input
                    type="date"
                    className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                    style={{ borderColor: C.brume }}
                    value={draft.date}
                    onChange={(event) =>
                      setDraft((prev) => ({ ...prev, date: event.target.value }))
                    }
                  />
                </label>
                <label className="text-xs font-semibold" style={{ color: C.terre }}>
                  Heure
                  <input
                    type="time"
                    className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                    style={{ borderColor: C.brume }}
                    value={draft.time}
                    onChange={(event) =>
                      setDraft((prev) => ({ ...prev, time: event.target.value }))
                    }
                  />
                </label>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-xs font-semibold" style={{ color: C.terre }}>
                  Catégorie
                  <select
                    className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                    style={{ borderColor: C.brume }}
                    value={draft.category}
                    onChange={(event) =>
                      setDraft((prev) => ({ ...prev, category: event.target.value }))
                    }
                  >
                    {CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-xs font-semibold" style={{ color: C.terre }}>
                  Accès
                  <select
                    className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                    style={{ borderColor: C.brume }}
                    value={draft.access}
                    onChange={(event) =>
                      setDraft((prev) => ({ ...prev, access: event.target.value }))
                    }
                  >
                    <option value="Gratuit">Gratuit</option>
                    <option value="Payant">Payant</option>
                    <option value="Sur inscription">Sur inscription</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                onClick={handleCancel}
                className="rounded-2xl px-4 py-2 text-sm font-semibold"
                style={{ backgroundColor: C.brume, color: C.terre }}
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="rounded-2xl px-4 py-2 text-sm font-bold text-white shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: draft.name.trim() ? C.corail : C.brume, color: C.sable }}
                disabled={!draft.name.trim()}
              >
                Enregistrer l'événement
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default EventCreator;
