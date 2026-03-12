import data from '../data/badge.json';
import { useState } from 'react';

export function BadgeIcons({ onLaunchActivity }) {
    const [selectedBadge, setSelectedBadge] = useState(null);
    const badges = data.badges ?? [];

    const handleLaunchActivity = () => {
        if (!selectedBadge) {
            return;
        }

        if (onLaunchActivity) {
            onLaunchActivity(selectedBadge);
        }
    };

    return (
        <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {badges.map((badge) => (
                    <button
                        key={badge.id}
                        type="button"
                        className="flex flex-col items-center gap-2 rounded-2xl p-3 transition hover:bg-gray-50"
                        onClick={() => setSelectedBadge(badge)}
                    >
                        <div className="relative h-20 w-20 overflow-hidden rounded-full border border-gray-200 bg-white">
                            <img
                                src={badge.image}
                                alt={badge.name}
                                title={badge.name}
                                className="h-full w-full object-cover"
                            />
                            {!badge.earned && <div className="absolute inset-0 bg-white/60" />}
                        </div>
                        <span className="text-center text-sm font-medium text-gray-800">{badge.name}</span>
                    </button>
                ))}
            </div>

            {selectedBadge && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
                    onClick={() => setSelectedBadge(null)}
                >
                    <div
                        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="mb-4 flex items-start justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <img
                                    src={selectedBadge.image}
                                    alt={selectedBadge.name}
                                    className="h-18 w-18 rounded-full border border-gray-200 object-cover"
                                />
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">{selectedBadge.name}</h2>
                                    <p className="text-sm text-gray-500">
                                        {selectedBadge.location || 'Localisation indisponible dans badge.json'}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="text-2xl leading-none text-gray-400 hover:text-gray-700"
                                onClick={() => setSelectedBadge(null)}
                            >
                                ×
                            </button>
                        </div>

                        <div className="mb-6 rounded-2xl bg-gray-50 p-4">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Prévisualisation
                            </p>
                            <p className="text-sm text-gray-700">{selectedBadge.activity}</p>
                        </div>

                        <button
                            type="button"
                            className="w-full rounded-full bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                            onClick={handleLaunchActivity}
                        >
                            Lancer une activité
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
