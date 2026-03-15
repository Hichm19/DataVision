import React, { useEffect, useState } from "react";
import { FileText, Clock, HardDrive, Inbox } from "lucide-react";

function Historique() {
  const [historique, setHistorique] = useState([]);

  useEffect(() => {
    const historyData = JSON.parse(localStorage.getItem("historique")) || [];
    setHistorique(historyData);
  }, []);

  return (
    <div>
      {/* Header */}
      <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-1">
        Historique
      </p>
      <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-8">
        Fichiers importés
      </h1>

      {historique.length === 0 ? (
        /* État vide */
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
            <Inbox size={24} className="text-slate-400" />
          </div>
          <p className="text-slate-600 font-medium mb-1">Aucun fichier importé</p>
          <p className="text-sm text-slate-400">
            Les fichiers CSV que vous importez apparaîtront ici.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          {/* En-tête tableau */}
          <div className="grid grid-cols-3 px-6 py-3 bg-slate-50 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Nom du fichier
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Taille
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Date d'import
            </span>
          </div>

          {/* Lignes */}
          <ul className="divide-y divide-slate-50">
            {historique.map((item, i) => (
              <li
                key={i}
                className="grid grid-cols-3 items-center px-6 py-4 hover:bg-slate-50 transition-colors"
              >
                {/* Nom */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
                    <FileText size={14} className="text-violet-500" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 truncate">
                    {item.nom}
                  </span>
                </div>

                {/* Taille */}
                <div className="flex items-center gap-2">
                  <HardDrive size={13} className="text-slate-400" />
                  <span className="text-sm text-slate-500">
                    {item.taille || "—"}
                  </span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-slate-400" />
                  <span className="text-sm text-slate-500">{item.date}</span>
                </div>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-100">
            <span className="text-xs text-slate-400">
              {historique.length} fichier{historique.length > 1 ? "s" : ""} au total
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Historique;