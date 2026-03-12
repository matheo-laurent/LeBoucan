import { useState } from "react";
import { Badge } from "./badge";

export function BadgeButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="flex items-center gap-2 px-4 py-2 bg-[#4A7A4A] text-[#F2EDE4] font-medium rounded hover:bg-[#7AB87A] transition"
        onClick={() => setOpen(true)}
      >
        <img
          src="https://www.svgrepo.com/show/228696/badge.svg"
          className="w-6 h-6"
          alt="Badges"
        />
        <span>Succès</span>
      </button>

      {open && <Badge isOpen={open} onClose={() => setOpen(false)} />}
    </>
  );
}