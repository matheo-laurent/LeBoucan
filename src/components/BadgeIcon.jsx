// src/components/BadgeIcon.jsx

function BadgeIcon({ badge, onClick }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Badge circle */}
      <div
        className={`relative flex h-14 w-14 items-center justify-center rounded-full border-4 shadow-lg ${
          badge.earned
            ? 'border-amber-400 bg-amber-50'
            : 'border-gray-300 bg-gray-100 grayscale'
        }`}
      >
        <img src={badge.image} alt={badge.name} className="h-8 w-8 object-contain" />
        {badge.earned && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] text-white shadow">
            ✓
          </span>
        )}
      </div>

      {/* Name */}
      <span
        className={`max-w-[80px] text-center text-[10px] font-bold leading-tight ${
          badge.earned ? 'text-amber-700' : 'text-gray-400'
        }`}
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        {badge.name}
      </span>

      {/* CTA button — only when not earned */}
      {!badge.earned && (
        <button
          onClick={onClick}
          className="rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1 text-[10px] font-black text-white shadow transition-transform hover:scale-105 active:scale-95"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          🚀 Lancer
        </button>
      )}
    </div>
  );
}

export default BadgeIcon;