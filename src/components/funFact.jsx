import { useState, useEffect } from 'react';

export default function Funfact() {
  const [funFact, setFunFact] = useState(null);

  useEffect(() => {
    fetch('/LeBoucan/data/funfacts.json')
      .then((response) => response.json())
      .then((data) => {
        const keys = Object.keys(data);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        setFunFact(data[randomKey]);
      })
      .catch((error) => {
        console.error('Error fetching fun facts:', error);
      });
  }, []);

  if (!funFact) return null;

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="text-gray-700 text-lg leading-relaxed font-light max-w-xl">{funFact}</p>
      <span className="mt-2 inline-block text-xs uppercase tracking-widest text-gray-400 font-semibold">
        Boucan Canot · La Réunion
      </span>
    </div>
  );
}
