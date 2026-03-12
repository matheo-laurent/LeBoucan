export function BadgeDesc({ isOpen, onClose, name, description }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-xl"
        >
          ×
        </button>
        <h2 className="text-lg font-bold mb-4">{name}</h2>
        <p className="text-sm text-gray-700">{description}</p>
      </div>
    </div>
  );
}