import React from 'react';

export default function AchievementPopup({ title, icon = '🏆', subtitle = 'Succès débloqué' }) {
  if (!title) return null;

  return (
    <div className="achievement-popup fixed top-6 right-6 z-[3000] pointer-events-none">
      <div className="rounded-2xl bg-white/95 px-4 py-3 shadow-2xl border border-amber-200 min-w-[210px]">
        <p className="text-sm font-bold text-gray-800">
          <span className="mr-2">{icon}</span>
          {subtitle}
        </p>
        <p className="text-xs text-gray-600 mt-1">{title}</p>
      </div>
    </div>
  );
}