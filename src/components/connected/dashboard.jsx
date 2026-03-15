import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import {
  LogOut, Upload, Search, ChevronLeft, ChevronRight,
  BarChart2, TrendingUp, PieChart as PieIcon, FileText,
  AlertCircle, CheckCircle, Database, Download
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

const estNumerique = (data, colonne) =>
  data.every((row) => row[colonne] !== "" && !isNaN(Number(row[colonne])));

const estCategorielle = (data, colonne) => {
  const valeurs = [...new Set(data.map((row) => row[colonne]))];
  return valeurs.length <= 10;
};

const COULEURS = ["#a78bfa","#6ee7b7","#fcd34d","#f9a8d4","#93c5fd","#86efac","#fda4af","#c4b5fd","#fde68a","#5eead4"];

const TYPES = [
  { value: "bar",  label: "Barres",    Icon: BarChart2 },
  { value: "line", label: "Ligne",     Icon: TrendingUp },
  { value: "pie",  label: "Camembert", Icon: PieIcon },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entetes, setEntetes] = useState([]);
  const [typeGraphique, setTypeGraphique] = useState("");
  const [axeX, setAxeX] = useState("");
  const [axeY, setAxeY] = useState("");
  const [graphiquesDisponibles, setGraphiquesDisponibles] = useState([]);
  const [dragging, setDragging] = useState(false);

  // Ref sur le conteneur du graphique
  const graphiqueRef = useRef(null);

  const ligneParPage = 10;

  useEffect(() => {
    const isLogged = localStorage.getItem("isLogged");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (isLogged !== "true" || !currentUser) navigate("/connexion");
    else setUser(currentUser);
  }, [navigate]);

  useEffect(() => {
    if (!axeX || !axeY || tableData.length === 0) {
      setGraphiquesDisponibles([]);
      setTypeGraphique("");
      return;
    }
    const yNum = estNumerique(tableData, axeY);
    const xCat = estCategorielle(tableData, axeX);
    const dispo = [];
    if (yNum) { dispo.push("bar"); dispo.push("line"); }
    if (yNum && xCat) {
      const uniques = [...new Set(tableData.map((r) => r[axeX]))];
      if (uniques.length <= 10) dispo.push("pie");
    }
    setGraphiquesDisponibles(dispo);
    setTypeGraphique(dispo[0] || "");
  }, [axeX, axeY, tableData]);

  const lireFichier = (file) => { if (file) setFileData(file); };
  const handleFileUpload = (e) => lireFichier(e.target.files[0]);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    lireFichier(e.dataTransfer.files[0]);
  };

  const handleFileSubmit = () => {
    if (!fileData) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const lines = event.target.result.split("\n").filter((l) => l.trim() !== "");
      const headers = lines[0].split(",").map((h) => h.trim());
      setEntetes(headers);
      const rows = lines.slice(1).map((line) => {
        const values = line.split(",");
        return headers.reduce((obj, h, i) => { obj[h] = values[i]?.trim() || ""; return obj; }, {});
      });
      setTableData(rows);
      setAxeX(""); setAxeY(""); setTypeGraphique("");
      const historique = JSON.parse(localStorage.getItem("historique")) || [];
      historique.push({ nom: fileData.name, taille: `${(fileData.size / 1024).toFixed(2)} KB`, date: new Date().toLocaleString() });
      localStorage.setItem("historique", JSON.stringify(historique));
    };
    reader.readAsText(fileData);
  };

  // Fonction de téléchargement
  const handleDownload = async () => {
    if (!graphiqueRef.current) return;
    try {
      const canvas = await html2canvas(graphiqueRef.current, {
        backgroundColor: "#ffffff",
        scale: 2, // haute résolution
      });
      const link = document.createElement("a");
      link.download = `graphique_${typeGraphique}_${axeX}_${axeY}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Erreur lors du téléchargement :", err);
    }
  };

  if (!user) return null;

  const filteredData = tableData.filter((row) =>
    Object.values(row).some((v) => v.toLowerCase().includes(searchItem.toLowerCase()))
  );
  const donneesGraphique = filteredData.slice(0, 100).map((row) => ({
    ...row, [axeY]: Number(row[axeY]),
  }));
  const indexOfLast = currentPage * ligneParPage;
  const currentRows = filteredData.slice(indexOfLast - ligneParPage, indexOfLast);
  const totalPage = Math.ceil(filteredData.length / ligneParPage);

  const tooltipStyle = {
    background: "#fff", border: "1px solid #e5e7eb",
    borderRadius: 8, fontSize: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  };

  const genererGraphique = () => {
    if (!typeGraphique || !axeX || !axeY) return null;
    if (graphiquesDisponibles.length === 0) return (
      <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm text-red-400">
        <AlertCircle size={15} /> L'axe Y doit contenir des valeurs numériques.
      </div>
    );
    const tickStyle = { fontSize: 11, fill: "#9ca3af" };
    switch (typeGraphique) {
      case "line": return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={donneesGraphique}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey={axeX} tick={tickStyle} axisLine={false} tickLine={false} />
            <YAxis tick={tickStyle} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey={axeY} stroke="#a78bfa" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      );
      case "bar": return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={donneesGraphique}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey={axeX} tick={tickStyle} axisLine={false} tickLine={false} />
            <YAxis tick={tickStyle} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey={axeY} fill="#a78bfa" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      );
      case "pie": return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Pie data={donneesGraphique} dataKey={axeY} nameKey={axeX}
              cx="50%" cy="50%" outerRadius={110}
              label={({ name, percent }) => `${name} · ${(percent * 100).toFixed(1)}%`}
              labelLine={false}
            >
              {donneesGraphique.map((_, i) => <Cell key={i} fill={COULEURS[i % COULEURS.length]} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      );
      default: return null;
    }
  };

  return (
    <>
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-1">
          Tableau de bord
        </p>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
          Bonjour, {user.prenom}
        </h1>
      </div>

      {/* Import */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-7 mb-5">
        <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-1">Importation</p>
        <h2 className="text-base font-semibold text-slate-800 mb-5">Importer un fichier CSV</h2>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl px-4 sm:px-6 py-6 sm:py-10 flex flex-col items-center gap-3 transition-colors ${
            dragging ? "border-violet-300 bg-violet-50" : "border-slate-200 bg-slate-50"
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
            <Upload size={18} className="text-violet-500" />
          </div>
          <p className="text-sm text-slate-500 text-center">
            {fileData ? fileData.name : "Glissez votre fichier ici ou"}
          </p>
          <label className="text-sm font-semibold text-violet-500 cursor-pointer hover:text-violet-700 underline underline-offset-2">
            Parcourir
            <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        {fileData && (
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-slate-50 rounded-xl px-4 py-3">
            <CheckCircle size={15} className="text-emerald-400 shrink-0" />
            <span className="text-sm text-slate-500 flex-1 break-all">
              {fileData.name} — {(fileData.size / 1024).toFixed(2)} KB
            </span>
            <button
              onClick={handleFileSubmit}
              className="w-full sm:w-auto bg-violet-500 hover:bg-violet-600 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors"
            >
              Analyser
            </button>
          </div>
        )}
      </div>

      {/* Tableau */}
      {tableData.length > 0 && (
        <>
          <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-7 mb-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
              <div>
                <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-1">Données</p>
                <h2 className="text-base font-semibold text-slate-800">{tableData.length} entrées importées</h2>
              </div>
              <div className="w-full sm:w-auto flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 bg-slate-50">
                <Search size={13} className="text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchItem}
                  onChange={(e) => { setSearchItem(e.target.value); setCurrentPage(1); }}
                  className="w-full bg-transparent outline-none text-sm text-slate-600 placeholder-slate-400"
                />
              </div>
            </div>

            <div className="overflow-x-auto max-h-80 rounded-xl border border-slate-100">
              <table className="min-w-full text-sm">
                <thead className="sticky top-0 bg-slate-50">
                  <tr>
                    {Object.keys(tableData[0]).map((h, i) => (
                      <th key={i} className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-slate-500 border-b border-slate-100 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                      {Object.values(row).map((val, j) => (
                        <td key={j} className="px-3 sm:px-4 py-2.5 text-slate-600 border-b border-slate-50 whitespace-nowrap">
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-center gap-4 mt-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 transition-colors"
              >
                <ChevronLeft size={14} className="text-slate-600" />
              </button>
              <span className="text-sm text-slate-500">Page {currentPage} / {totalPage}</span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPage))}
                disabled={currentPage === totalPage}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 transition-colors"
              >
                <ChevronRight size={14} className="text-slate-600" />
              </button>
            </div>
          </div>

          {/* Graphique */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-7">
            <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-1">Visualisation</p>

            {/* Titre + bouton télécharger */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-slate-800">Générer un graphique</h2>
              {typeGraphique && graphiquesDisponibles.length > 0 && (
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 border border-slate-200 text-slate-500 hover:bg-slate-50 px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                >
                  <Download size={13} />
                  Télécharger
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-5">
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-xs font-semibold text-slate-500">Axe X — catégorie</label>
                <select
                  value={axeX}
                  onChange={(e) => setAxeX(e.target.value)}
                  className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 bg-white outline-none focus:border-violet-300"
                >
                  <option value="">Choisir une colonne</option>
                  {entetes.map((h, i) => <option key={i} value={h}>{h}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-xs font-semibold text-slate-500">Axe Y — valeur numérique</label>
                <select
                  value={axeY}
                  onChange={(e) => setAxeY(e.target.value)}
                  className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 bg-white outline-none focus:border-violet-300"
                >
                  <option value="">Choisir une colonne</option>
                  {entetes.map((h, i) => <option key={i} value={h}>{h}</option>)}
                </select>
              </div>
            </div>

            {graphiquesDisponibles.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {TYPES.filter((t) => graphiquesDisponibles.includes(t.value)).map(({ value, label, Icon }) => (
                  <button
                    key={value}
                    onClick={() => setTypeGraphique(value)}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium border transition-colors ${
                      typeGraphique === value
                        ? "bg-violet-50 border-violet-200 text-violet-600"
                        : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    <Icon size={14} />
                    {label}
                  </button>
                ))}
              </div>
            )}

            {axeX && axeY && (
              <div className="flex items-center gap-2 mb-4">
                {graphiquesDisponibles.length > 0
                  ? <><CheckCircle size={13} className="text-emerald-400 shrink-0" /><span className="text-xs text-slate-500">{graphiquesDisponibles.length} type(s) disponible(s)</span></>
                  : <><AlertCircle size={13} className="text-red-400 shrink-0" /><span className="text-xs text-red-400">L'axe Y doit être numérique</span></>
                }
              </div>
            )}

            {/* Conteneur du graphique avec ref */}
            <div ref={graphiqueRef} className="mt-4 overflow-x-auto bg-white p-4 rounded-xl">
              {genererGraphique()}
            </div>

          </div>
        </>
      )}
    </>
  );
}