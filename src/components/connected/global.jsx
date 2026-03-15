import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LogOut, BarChart2, FileText, Settings, Database, Menu, X } from "lucide-react";
import Deconnexion from "../Deconnexion";

function Global() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const isLogged = localStorage.getItem("isLogged");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (isLogged !== "true" || !currentUser) {
      navigate("/connexion");
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [navigate]);

  if (!user) return null;

  const navLinks = [
    { to: "/dashboard",   label: "Tableau de bord", Icon: BarChart2 },
    { to: "/historique",  label: "Historique",       Icon: FileText  },
    { to: "/parametres",  label: "Paramètres",       Icon: Settings  },
  ];

  return (
    <div className="flex w-screen h-screen bg-slate-50 font-sans overflow-hidden">

      {/* Bouton menu mobile */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-lg bg-white border border-slate-200 shadow-md hover:bg-slate-50 transition-colors"
        aria-label="Menu"
      >
        {mobileMenuOpen ? <X size={20} className="text-slate-600" /> : <Menu size={20} className="text-slate-600" />}
      </button>

      {/* Overlay pour mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-64 sm:w-56 bg-white border-r border-slate-100 flex flex-col px-4 sm:px-5 py-5 sm:py-7
        h-screen overflow-y-auto
      `}>
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8 sm:mb-10">
          <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
            <Database size={16} className="text-violet-500" />
          </div>
          <span className="font-bold text-slate-800 text-base tracking-tight truncate">
            DataVision
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 flex-1">
          {navLinks.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-violet-50 text-violet-600"
                    : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                }`
              }
            >
              <Icon size={15} className="shrink-0" />
              <span className="truncate">{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Infos utilisateur */}
        <div className="mb-4 px-3 py-3 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-xs font-bold text-violet-600 shrink-0">
              {user.prenom?.[0]}{user.nom?.[0]}
            </div>
            <div className="overflow-hidden min-w-0">
              <p className="text-sm font-semibold text-slate-700 truncate">
                {user.prenom} {user.nom}
              </p>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Déconnexion */}
        <div className="flex items-center gap-2 text-sm font-medium text-red-400 border border-red-100 rounded-lg px-3 py-2.5 hover:bg-red-50 transition-colors cursor-pointer">
          <LogOut size={14} className="shrink-0" />
          <span className="truncate">
            <Deconnexion />
          </span>
        </div>

        {/* Version texte pour mobile */}
        <div className="mt-4 text-center text-xs text-slate-400 lg:hidden">
          <p>DataVision v1.0</p>
        </div>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-9">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

    </div>
  );
}

export default Global;