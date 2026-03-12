import story from '/data/story.json';

export default function StoryTelling({ id }) {
  const lieu = story.find((s) => s.id == id);

  if (!lieu) {
    return <p>Lieu introuvable</p>;
  }

  return (
    <div>
      <h2>{lieu.nom}</h2>
      <p>{lieu.description}</p>
      <p>{lieu.histoire_engagee}</p>
      <p>{lieu.geste_responsable}</p>
      <p>{lieu.experience_terroir}</p>
    </div>
  );
}
