import data from "../data/badge.json"
import { BadgeCard } from "./badge-card.jsx"
import { BadgeDesc } from "./badge-description.jsx"
import { useState } from "react"

export function Badge({ isOpen, onClose }) {
  if (!isOpen) return null

  const badgesData = data.badges
  const [selectedBadge, setSelectedBadge] = useState(null)

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
        >
          ×
        </button>

        <h1 className="text-xl font-bold mb-4">Mes Badges</h1>

        <div className="grid grid-cols-5 gap-4">
          {badgesData.map(badge => (
            <BadgeCard
              key={badge.id}
              name={badge.name}
              img={badge.image}
              inactive={!badge.earned}
              onClick={() => setSelectedBadge(badge)}
            />
          ))}
        </div>
      </div>

      {selectedBadge && (
        <BadgeDesc
          isOpen={!!selectedBadge}
          onClose={() => setSelectedBadge(null)}
          name={selectedBadge.name}
          description={selectedBadge.activity}
        />
      )}
    </div>
  )
}