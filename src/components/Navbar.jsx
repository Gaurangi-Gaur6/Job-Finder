import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BriefcaseBusiness, Menu, X } from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Find Jobs", path: "/jobs" },
    { name: "Saved Jobs", path: "/saved" },
    { name: "Applications", path: "/applications" },
  ];

  const linkClass = ({ isActive }) =>
    `block text-sm font-medium transition ${isActive
      ? "text-indigo-600"
      : "text-gray-600 hover:text-indigo-600"
    }`;

  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">

        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => setMenuOpen(false)}
        >
          <BriefcaseBusiness className="h-7 w-7 text-indigo-600" />
          <span className="text-xl font-bold text-gray-900">
            JobFinder
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={linkClass}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Login
          </button>

          <button
            type="button"
            className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="space-y-4 border-t border-gray-200 px-4 py-4 md:hidden">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
