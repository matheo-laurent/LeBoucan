class Companion {
  constructor(lvl = 1, entity = "plant", form = 1) {
    this.lvl = lvl;
    this.entity = entity;
    this.form = form;
  }

  getLvl() {
    return this.lvl;
  }

  getEntity() {
    return this.entity;
  }

  getForm() {
    return this.form;
  }

  setLvl(lvl) {
    this.lvl = lvl;
  }

  setEntity(entity) {
    this.entity = entity;
  }

  setForm(form) {
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
  const companion = new Companion();

  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-gray-800">
        La plante de Lucas 🥸
      </h1>
      <p>Niveau : {companion.getLvl()}</p>
      <p>Entité : {companion.getEntity()}</p>
      <p>Forme : {companion.getForm()}</p>
    </div>
  );
}

export default Plant;