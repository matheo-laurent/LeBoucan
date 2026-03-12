import { useState } from "react";
import Navbar from "./components/Navbar";
import {drawCompanion} from "./components/companionDrawer.jsx";

class Companion {
  constructor(lvl = 1, entity = "plant", form = 1) {
    this.lvl = lvl;
    this.entity = entity;
    this.form = form;
  }

  lvlUp() {
    this.lvl += 1;
  }

  grow() {
    this.form += 1;
  }
}

function Plant() {

  const [companion, setCompanion] = useState(new Companion());

  const lvlUp = () => {
    const updated = new Companion(
      companion.lvl,
      companion.entity,
      companion.form
    );

    updated.lvlUp();

    setCompanion(updated);
  };

  const grow = () => {
    const updated = new Companion(
      companion.lvl,
      companion.entity,
      companion.form
    );

    updated.grow();

    setCompanion(updated);
  };

  return (
    <div className="pt-16 min-h-screen flex flex-col items-center justify-center gap-6 bg-gradient-to-b from-[#81a4cd] to-[#d8d1d2]">

      <Navbar />

      <h1 className="text-4xl font-bold text-green-900">
        La plante de Lucas 🥸
      </h1>

      {/* affichage entité */}
      {drawCompanion(companion.entity, companion.form)}

      {/* stats */}
      <div className="bg-[#d8d1d2] shadow-xl rounded-xl p-6 flex flex-col gap-2 text-center w-60 border-2 border-[#304966]">

        <p className="text-lg font-semibold">
          Niveau : {companion.lvl}
        </p>

        <p className="text-lg font-semibold">
          Forme : {companion.form}
        </p>

      </div>

      {/* boutons */}
      <div className="flex gap-4">

        <button
          onClick={lvlUp}
          className="px-4 py-2 bg-[#0360a3] text-white rounded-lg shadow hover:bg-[#304966] transition"
        >
          lvl +
        </button>

        <button
          onClick={grow}
          className="px-4 py-2 bg-[#ffe453] text-[#304966] rounded-lg shadow hover:bg-[#958580] transition"
        >
          grow
        </button>

      </div>

    </div>
  );
}

export default Plant;