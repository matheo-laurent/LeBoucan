import { useState } from "react";
import {drawCompanion} from "./components/CompanionDrawer.jsx";

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
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gradient-to-b from-green-200 to-green-400">

      <h1 className="text-4xl font-bold text-green-900">
        La plante de Lucas 🥸
      </h1>

      {/* affichage entité */}
      {drawCompanion(companion.entity, companion.form)}

      {/* stats */}
      <div className="bg-white shadow-xl rounded-xl p-6 flex flex-col gap-2 text-center w-60">

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
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          lvl +
        </button>

        <button
          onClick={grow}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
        >
          grow
        </button>

      </div>

    </div>
  );
}

export default Plant;