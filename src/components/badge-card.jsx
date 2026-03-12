export function BadgeCard({ name, img, inactive, onClick }) {
  return (
    <div className="flex flex-col items-center p-2" onClick={onClick}>
      <div className="relative w-20 h-20 mb-2">
        <img src={img} alt={name} className={`w-20 h-20 rounded-full object-cover`} />
        {inactive && (
          <div className="absolute inset-0 rounded-full bg-gray-200/50 pointer-events-none"></div>
        )}
      </div>
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
}
