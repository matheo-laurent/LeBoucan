import { NavLink } from "react-router-dom";

function Navbar() {

  const tabs = [
    { name: "Carte", path: "/" },
    { name: "Mes badges", path: "/badges" },
    { name: "Mon Macébuddy", path: "/plant" }
  ];

  return (
    <div className="fixed top-0 left-0 w-full flex justify-center bg-[#304966] border-b-4 border-[#0360a3] z-1000">

      <div className="flex gap-2 pt-3">

        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            className={({ isActive }) =>
              `
              px-6 py-2 rounded-t-lg font-bold tracking-wide
              border border-[#958580] border-b-0
              transition-all duration-200
              ${
                isActive
                  ? "bg-[#d8d1d2] text-[#304966] shadow-lg"
                  : "bg-[#81a4cd] text-[#304966] hover:bg-[#ffe453]"
              }
              `
            }
          >
            {tab.name}
          </NavLink>
        ))}

      </div>

    </div>
  );
}

export default Navbar;