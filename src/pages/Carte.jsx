// src/pages/Carte.jsx
import { useState } from 'react';
import Map from '../components/Map.jsx';
import BadgeIcon from '../components/BadgeIcon.jsx';
import { drawCompanion } from '../components/companionDrawer.jsx';
import badgesData from '../data/badge.json';

const COMPANION_ENTITY = 'dodo';
const MAX_FORM = 4;

const C = {
  terre:   '#2D4A2D',
  mousse:  '#4A7A4A',
  feuille: '#7AB87A',
  brume:   '#B8D4B8',
  sable:   '#F2EDE4',
  ocre:    '#C47A3A',
  corail:  '#D95F3B',
  nuit:    '#1A2A1A',
};

// ── Activity Modal ──────────────────────────────────────────────────────────
function ActivityModal({ badge, onClose, onEarn }) {
  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center backdrop-blur-sm"
      style={{ backgroundColor: 'rgba(29,42,29,0.55)' }}
      onClick={onClose}
    >
      <div
        className="relative mx-4 w-full max-w-sm rounded-3xl p-6 shadow-2xl"
        style={{ backgroundColor: C.sable, fontFamily: "'DM Sans', sans-serif" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold transition hover:opacity-80"
          style={{ backgroundColor: C.brume, color: C.terre }}
        >
          ✕
        </button>

        <div className="flex flex-col items-center gap-3">
          <BadgeIcon badge={badge} />
          <div className="text-center">
            <h2
              className="text-lg font-bold"
              style={{ fontFamily: "'Playfair Display', serif", color: C.terre }}
            >
              {badge.name}
            </h2>
            <p className="mt-1 text-sm" style={{ color: C.nuit, opacity: 0.65 }}>
              {badge.activity}
            </p>
          </div>
          <div
            className="flex w-full items-center justify-center gap-2 rounded-xl py-2 text-sm font-semibold"
            style={{
              backgroundColor: badge.earned ? `${C.feuille}22` : `${C.ocre}22`,
              color: badge.earned ? C.mousse : C.ocre,
            }}
          >
            {badge.earned ? '✓ Badge déjà obtenu' : '🔒 Badge non débloqué'}
          </div>
          <button
            onClick={badge.earned ? onClose : onEarn}
            className="mt-1 w-full rounded-2xl py-3 text-sm font-bold text-white shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundColor: badge.earned ? C.mousse : C.corail }}
          >
            {badge.earned ? '🎉 Fermer' : "🚀 Lancer l'activité"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Panneau gauche : résumé des badges ──────────────────────────────────────
function BadgesSummary({ badges }) {
  const earned = badges.filter((b) => b.earned).length;

  return (
    <aside
      className="flex w-full flex-col gap-3 rounded-2xl p-4 shadow-lg
                 lg:w-56 lg:shrink-0 xl:w-64"
      style={{ backgroundColor: 'rgba(242,237,228,0.92)', fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Score */}
      <div>
        <p
          className="text-[11px] font-bold uppercase tracking-widest"
          style={{ color: C.ocre, fontFamily: "'Space Mono', monospace" }}
        >
          Badges
        </p>
        <p className="mt-0.5 text-3xl font-bold" style={{ color: C.terre, fontFamily: "'Playfair Display', serif" }}>
          {earned}
          <span className="text-base font-normal" style={{ color: C.nuit, opacity: 0.45 }}>
            {' '}/ {badges.length}
          </span>
        </p>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: C.brume }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(earned / badges.length) * 100}%`, backgroundColor: C.feuille }}
        />
      </div>

      {/* Badge list */}
      <ul className="flex flex-col gap-3">
        {badges.map((badge) => (
          <li key={badge.id} className="flex items-center gap-3">
            {/* Image plus grande */}
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2"
              style={{
                borderColor: badge.earned ? C.ocre : C.brume,
                backgroundColor: badge.earned ? `${C.ocre}18` : C.brume,
                filter: badge.earned ? 'none' : 'grayscale(1)',
              }}
            >
              <img src={badge.image} className="h-7 w-7 object-contain" alt={badge.name} />
            </div>

            <div className="min-w-0">
              {/* Texte nom plus grand */}
              <p
                className="truncate text-sm font-semibold"
                style={{ color: badge.earned ? C.nuit : C.brume }}
              >
                {badge.name}
              </p>
              <p
                className="text-[10px]"
                style={{ fontFamily: "'Space Mono', monospace", color: badge.earned ? C.mousse : C.brume }}
              >
                {badge.earned ? '✓ Obtenu' : '🔒 Verrouillé'}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}

// ── Panneau droit : companion ────────────────────────────────────────────────
function CompanionPanel({ entity, form }) {
  const formLabels = ['', 'Niveau 1', 'Niveau 2', 'Niveau 3', 'Niveau 4 — Max'];

  return (
    <aside
      className="flex w-full flex-col items-center gap-3 rounded-2xl p-4 shadow-lg
                 lg:w-56 lg:shrink-0 xl:w-64"
      style={{ backgroundColor: 'rgba(242,237,228,0.92)', fontFamily: "'DM Sans', sans-serif" }}
    >
      <p
        className="text-[11px] font-bold uppercase tracking-widest"
        style={{ color: C.ocre, fontFamily: "'Space Mono', monospace" }}
      >
        Compagnon
      </p>

      {/* Image dodo bien plus grande */}
      <div className="relative flex h-44 w-44 items-center justify-center lg:h-52 lg:w-52">
        <div
          className="absolute inset-0 rounded-full blur-xl"
          style={{ backgroundColor: C.feuille, opacity: 0.35 }}
        />
        <div className="relative z-10 flex h-40 w-40 items-center justify-center lg:h-48 lg:w-48">
          {drawCompanion(entity, form)}
        </div>
      </div>

      {/* Nom + niveau plus grands */}
      <div className="text-center">
        <p
          className="text-xl font-bold capitalize"
          style={{ fontFamily: "'Playfair Display', serif", color: C.terre }}
        >
          {entity}
        </p>
        <p className="mt-0.5 text-sm font-semibold" style={{ color: C.mousse }}>
          {formLabels[form] ?? formLabels[MAX_FORM]}
        </p>
      </div>

      {/* Evolution dots */}
      <div className="flex gap-2">
        {Array.from({ length: MAX_FORM }).map((_, i) => (
          <div
            key={i}
            className="h-3 w-3 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i < form ? C.feuille : C.brume,
              transform: i < form ? 'scale(1.2)' : 'scale(1)',
            }}
          />
        ))}
      </div>

      {form < MAX_FORM ? (
        <p className="text-center text-xs" style={{ color: C.nuit, opacity: 0.6 }}>
          Encore{' '}
          <span className="font-bold" style={{ color: C.ocre }}>
            {MAX_FORM - form} activité{MAX_FORM - form > 1 ? 's' : ''}
          </span>{' '}
          pour évoluer
        </p>
      ) : (
        <p className="text-center text-xs font-bold" style={{ color: C.feuille }}>
          🎉 Évolution maximale !
        </p>
      )}
    </aside>
  );
}

// ── Page principale ──────────────────────────────────────────────────────────
function Carte() {
  const [badges, setBadges] = useState(badgesData.badges);
  const [companionForm, setCompanionForm] = useState(1);
  const [selectedBadge, setSelectedBadge] = useState(null);

  const handleEarn = () => {
    setBadges((prev) =>
      prev.map((b) => (b.id === selectedBadge.id ? { ...b, earned: true } : b)),
    );
    setCompanionForm((prev) => Math.min(prev + 1, MAX_FORM));
    setSelectedBadge(null);
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center p-3 lg:p-5"
      style={{ backgroundColor: C.sable }}
    >
      {/* Header */}
      <header className="mb-3 text-center lg:mb-4">
        <p
          className="text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ color: C.ocre, fontFamily: "'Space Mono', monospace" }}
        >
          Tourisme engagé — La Réunion
        </p>
        <h1
          className="mt-0.5 text-2xl font-bold lg:text-3xl"
          style={{ fontFamily: "'Playfair Display', serif", color: C.terre }}
        >
          Carte interactive
        </h1>
      </header>

      {/* Layout : panneaux + carte */}
      <div className="flex w-full max-w-[1400px] flex-col gap-3 lg:flex-row lg:items-stretch">
        <BadgesSummary badges={badges} />

        {/* Map — prend tout l'espace restant */}
        <div
          className="min-w-0 flex-1 overflow-hidden rounded-3xl shadow-xl"
          style={{ outline: `3px solid ${C.brume}` }}
        >
          <div className="h-[420px] sm:h-[520px] lg:h-full lg:min-h-[620px]">
            <Map badges={badges} onBadgeClick={setSelectedBadge} />
          </div>
        </div>

        <CompanionPanel entity={COMPANION_ENTITY} form={companionForm} />
      </div>

      {selectedBadge && (
        <ActivityModal
          badge={selectedBadge}
          onClose={() => setSelectedBadge(null)}
          onEarn={handleEarn}
        />
      )}
    </main>
  );
}

export default Carte;