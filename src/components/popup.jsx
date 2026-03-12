/**
 * Component for creating pop-ups.
 * One component is without a trigger (e.g., a button to close it).
 */

export default function PopupWithoutTrigger({ title, children }) {
  return (
    <div>
      <div className="fixed rounded-lg overflow-y-auto flex items-center justify-center z-50 inset-0 bg-black/40">
        <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
          {/* Popup Content */}
          {title ? (
            <>
              <p className="text-center text-2xl font-bold text-gray-800">{title}</p>
              <div className="p-4 mx-auto">{children}</div>
            </>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
}
