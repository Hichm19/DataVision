import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LogOut, BarChart2, FileText, Settings, Database } from "lucide-react";
import Deconnexion from "../Deconnexion";

function Global() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const isLogged = localStorage.getItem("isLogged");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (isLogged !== "true" || !currentUser) {
      navigate("/connexion");
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  if (!user) return null;

  const navLinks = [
    { to: "/dashboard",   label: "Tableau de bord", Icon: BarChart2 },
    { to: "/historique",  label: "Historique",       Icon: FileText  },
    { to: "/parametres",  label: "Paramètres",       Icon: Settings  },
  ];

  return (
    <div className="flex w-screen h-screen bg-slate-50 font-sans">

      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-white border-r border-slate-100 flex flex-col px-5 py-7 sticky top-0 h-screen">

        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-10">
          <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
            <Database size={16} className="text-violet-500" />
          </div>
          <span className="font-bold text-slate-800 text-base tracking-tight">
            DataVision
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 flex-1">
          {navLinks.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-violet-50 text-violet-600"
                    : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                }`
              }
            >
              <Icon size={15} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Infos utilisateur */}
        <div className="mb-4 px-3 py-3 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-xs font-bold text-violet-600 shrink-0">
              {user.prenom?.[0]}{user.nom?.[0]}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-slate-700 truncate">
                {user.prenom} {user.nom}
              </p>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Déconnexion */}
        <div className="flex items-center gap-2 text-sm font-medium text-red-400 border border-red-100 rounded-lg px-3 py-2.5 hover:bg-red-50 transition-colors cursor-pointer">
          <LogOut size={14} />
          <Deconnexion />
        </div>

      </aside>

      {/* Contenu principal */}
      <main className="flex-1 overflow-y-auto px-10 py-9">
        <Outlet />
      </main>

    </div>
  );
}

export default Global;