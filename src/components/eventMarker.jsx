import { useEffect, useMemo, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const MARKER_STYLE = {
  border: '#fbbf24',
  background: '#fffbeb',
};

function makeEventMarkerIcon(item, index) {
  const label = String(item.id ?? index + 1);

  return L.divIcon({
    className: '',
    html: `
      <div style="
        position:relative;width:44px;height:44px;border-radius:50%;
        border:3px solid ${MARKER_STYLE.border};
        background:${MARKER_STYLE.background};
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 3px 8px rgba(0,0,0,0.2);
      ">
        <span style="
          font-size:16px;line-height:1;color:${MARKER_STYLE.border};
          font-weight:800;font-family:'DM Sans', sans-serif;
        ">${label}</span>
        <span style="
          position:absolute;top:-4px;right:-4px;
          background:${MARKER_STYLE.border};color:white;border-radius:50%;
          width:14px;height:14px;font-size:9px;
          display:flex;align-items:center;justify-content:center;
          font-weight:700;
        ">✦</span>
      </div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 44],
    popupAnchor: [0, -48],
  });
}

function EventMarkers() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const baseUrl = import.meta.env.BASE_URL ?? '/';
    const dataUrl = new URL(`${baseUrl}/data/mace.json`, window.location.origin).toString();
    fetch(dataUrl)
      .then((response) => response.json())
      .then((data) => {
        if (!isMounted) return;
        const normalized = Array.isArray(data)
          ? data.map((item) => ({
              ...item,
              lat: Number(item.lat),
              lon: Number(item.lon),
            }))
          : [];
        setItems(
          normalized.filter((item) => Number.isFinite(item.lat) && Number.isFinite(item.lon)),
        );
      })
      .catch(() => {
        if (!isMounted) return;
        setItems([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const iconCache = useMemo(
    () => items.map((item, index) => makeEventMarkerIcon(item, index)),
    [items],
  );

  if (items.length === 0) return null;

  return (
    <>
      {items.map((item, index) => (
        <Marker
          key={`mace-${item.id ?? index}`}
          position={[item.lat, item.lon]}
          icon={iconCache[index]}
        >
          <Popup className="mace-popup" autoPan={true}>
            <div
              className="w-[220px] max-w-[80vw] rounded-2xl border bg-white/95 p-3 text-center shadow-lg sm:w-[260px]"
              style={{
                borderColor: 'rgba(184, 212, 184, 0.8)',
                fontFamily: "'Nunito', sans-serif",
                maxHeight: '60vh',
                overflowY: 'auto',
              }}
            >
              <div
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2"
                style={{
                  borderColor: MARKER_STYLE.border,
                  backgroundColor: MARKER_STYLE.background,
                  color: MARKER_STYLE.border,
                }}
              >
                ★
              </div>
              <p
                className="mt-2 text-[10px] font-black uppercase tracking-[0.2em]"
                style={{ color: '#C47A3A' }}
              >
                Lieu légendaire
              </p>
              <h3
                className="mt-1 text-base font-bold"
                style={{ fontFamily: "'Playfair Display', serif", color: '#2D4A2D' }}
              >
                {item.nom}
              </h3>
              <p className="mt-1 text-xs" style={{ color: '#1A2A1A', opacity: 0.7 }}>
                {item.description}
              </p>

              <div className="mt-3 grid gap-2 text-left text-[11px]">
                <div className="rounded-xl bg-[#F2EDE4] p-2">
                  <p className="font-bold" style={{ color: '#4A7A4A' }}>
                    Histoire engagée
                  </p>
                  <p className="mt-1" style={{ color: '#1A2A1A', opacity: 0.7 }}>
                    {item.histoire_engagee}
                  </p>
                </div>
                <div className="rounded-xl bg-[#F8EDE0] p-2">
                  <p className="font-bold" style={{ color: '#C47A3A' }}>
                    Geste responsable
                  </p>
                  <p className="mt-1" style={{ color: '#1A2A1A', opacity: 0.7 }}>
                    {item.geste_responsable}
                  </p>
                </div>
                <div className="rounded-xl bg-[#E5F1E5] p-2">
                  <p className="font-bold" style={{ color: '#2D4A2D' }}>
                    Expérience terroir
                  </p>
                  <p className="mt-1" style={{ color: '#1A2A1A', opacity: 0.7 }}>
                    {item.experience_terroir}
                  </p>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}

export default EventMarkers;
