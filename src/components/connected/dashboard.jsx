import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import Deconnexion from "../Deconnexion";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [fileData, setFileData] = useState(null); // fichier importé
  const [tableData, setTableData] = useState([]); // contenu du fichier sous forme de tableau

  // Vérifie si l'utilisateur est connecté
  useEffect(() => {
    const isLogged = localStorage.getItem("isLogged");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (isLogged !== "true" || !currentUser) {
      navigate("/connexion");
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  // Lorsqu'on sélectionne un fichier
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileData(file);
  };

  // Lecture et affichage du fichier CSV
  const handleFileSubmit = () => {
    if (!fileData) return;

    const reader = new FileReader();

    // Fonction appelée quand la lecture est terminée
    reader.onload = (event) => {
      const text = event.target.result;

      // Conversion du texte CSV en tableau d'objets JS
      const lines = text.split("\n").filter(line => line.trim() !== "");
      const headers = lines[0].split(",").map(h => h.trim());
      const rows = lines.slice(1).map(line => {
        const values = line.split(",");
        return headers.reduce((obj, header, i) => {
          obj[header] = values[i]?.trim() || "";
          return obj;
        }, {});
      });

      setTableData(rows);
    };

    reader.readAsText(fileData); // lire le fichier comme texte
  };

  if (!user) return null;

  return (
    <div className="flex w-screen h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* --- Sidebar --- */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col justify-between p-6">
        <div>
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">
            DataVision
          </h2>
          <ul className="space-y-4">
            <li className="cursor-pointer hover:text-blue-500">Accueil</li>
            <li className="cursor-pointer hover:text-blue-500">Tableau de bord</li>
            <li className="cursor-pointer hover:text-blue-500">Mes fichiers</li>
            <li className="cursor-pointer hover:text-blue-500">Paramètres</li>
          </ul>
        </div>
        <div className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition">
          <LogOut size={18} />
          <Deconnexion />
        </div>
      </aside>

      {/* --- Contenu principal --- */}
      <main className="flex-1 p-10 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4">Bonjour {user.prenom}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Bienvenue sur votre tableau de bord personnel.
        </p>

        {/* --- Import fichier --- */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-xl mb-6">
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold">
            Importer un fichier :
          </label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
          />

          {fileData && (
            <button
              onClick={handleFileSubmit}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
            >
              Envoyer le fichier
            </button>
          )}
        </div>

        {/* --- Zone de visualisation --- */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-5xl overflow-x-auto">
          {tableData.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {Object.keys(tableData[0]).map((header, i) => (
                    <th key={i} className="border px-3 py-2 bg-gray-100 dark:bg-gray-700">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.slice(0, 5).map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((value, j) => (
                      <td key={j} className="border px-3 py-2 text-sm">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Aucune donnée importée pour le moment.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
