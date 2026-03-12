import React, { useState } from "react";
import { drawCompanion } from "./components/CompanionDrawer.jsx";
import Navbar from "./components/Navbar.jsx"

function Plant() {
  const [evolving, setEvolving] = useState(false);
  const [editingName, setEditingName] = useState(false);

  const [companion, setCompanion] = useState({
    lvl: 1,
    entity: "plant",
    form: 1,
    name: "Plant",
  });

  const getFormFromLevel = (lvl) => {
    if (lvl >= 10) return 4;
    if (lvl >= 5) return 3;
    if (lvl >= 2) return 2;
    return 1;
  };

  const lvlUp = () => {
    setCompanion((prev) => {
      const newLvl = Math.min(prev.lvl + 1, 10);
      const newForm = getFormFromLevel(newLvl);

      if (newForm !== prev.form) {
        setEvolving(true);
        setTimeout(() => setEvolving(false), 800);
      }

      return { ...prev, lvl: newLvl, form: newForm };
    });
  };

  const changeEntity = (entity) => {
    setCompanion((prev) => ({ ...prev, entity }));
  };

  const handleNameChange = (e) => {
    setCompanion((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleNameKey = (e) => {
    if (e.key === "Enter") setEditingName(false);
  };

  const companionsList = ["plant", "dodo", "tangue"];
  const progress = (companion.lvl / 10) * 100;

  return (
<div className="pt-16 min-h-screen flex flex-col items-center justify-center gap-6 bg-gradient-to-b from-[#81a4cd] to-[#d8d1d2]">
    <Navbar />
  {/* Carte centrale */}
  <div className="relative bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-[360px] flex flex-col items-center gap-4">

    {/* bouton changer de créature */}
    <div className="absolute top-4 left-4">
      <button
        onClick={() => {
          const companionsList = ["plant", "dodo", "tangue"];
          const currentIndex = companionsList.indexOf(companion.entity);
          const nextIndex = (currentIndex + 1) % companionsList.length;
          changeEntity(companionsList[nextIndex]);
        }}
        className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md hover:scale-110 transition"
      >
        <span className="text-xl">
          {companion.entity === "plant" ? "🌱" :
           companion.entity === "dodo" ? "🦤" : "🦔"}
        </span>
      </button>
    </div>

    {/* Nom éditable */}
    <div className="flex items-center gap-2">
      {!editingName ? (
        <>
          <span className="text-lg font-semibold text-center">{companion.name}</span>
          <button
            onClick={() => setEditingName(true)}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            ✏️
          </button>
        </>
      ) : (
        <input
          type="text"
          value={companion.name}
          onChange={handleNameChange}
          onKeyDown={handleNameKey}
          onBlur={() => setEditingName(false)}
          className="w-[120px] text-center text-lg font-semibold border-b-2 border-green-300 focus:outline-none focus:border-green-500 bg-transparent"
          maxLength={12}
          autoFocus
        />
      )}
    </div>

    {/* zone créature avec shine */}
    <div
      className={`relative w-40 h-40 flex items-center justify-center bg-green-50 rounded-2xl shadow-inner overflow-hidden transition-transform duration-700
        ${evolving ? "scale-110 brightness-125" : ""}`}
    >
      {evolving && <div className="evolution-flash absolute inset-0 rounded-2xl" />}
      {evolving && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="sparkle sparkle1">✨</span>
          <span className="sparkle sparkle2">⭐</span>
          <span className="sparkle sparkle3">✨</span>
          <span className="sparkle sparkle4">⭐</span>
          <span className="sparkle sparkle5">✨</span>
        </div>
      )}
      <div className="relative z-10 flex items-center justify-center">
        {drawCompanion(companion.entity, companion.form)}
      </div>
    </div>

    {/* stats */}
    <div className="w-full flex flex-col gap-2 text-center">
      <p className="text-lg font-semibold text-gray-700">Niveau {companion.lvl}</p>
      <p className="text-sm text-gray-500">Stade {companion.form}</p>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-[#81a4cd] h-full transition-all duration-500"
          style={{ width: `${(companion.lvl / 10) * 100}%` }}
        />
      </div>
    </div>

    {/* bouton lvl */}
    <button
      onClick={lvlUp}
      disabled={companion.lvl === 10}
      className="w-full py-3 rounded-xl bg-[#81a4cd] text-white font-semibold shadow-lg hover:bg-[#304966] active:scale-95 transition disabled:bg-gray-400"
    >
      Gain d'XP ⭐
    </button>

  </div>

</div>
  );
}

export default Plant;