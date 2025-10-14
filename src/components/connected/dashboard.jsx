import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react"; // icône propre et moderne
import Deconnexion from "../Deconnexion"
function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Vérifier si l’utilisateur est connecté
  useEffect(() => {
    const isLogged = localStorage.getItem("isLogged");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (isLogged !== "true" || !currentUser) {
      navigate("/connexion"); // redirection si non connecté
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

 
  
  if (!user) return null; // Évite d’afficher avant le chargement

  return (
    <div className="flex w-screen h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* --- Sidebar --- */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col justify-between p-6">
        <div>
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">
            DataVision
          </h2>
          <ul className="space-y-4">
            <li className="cursor-pointer hover:text-blue-500"> Accueil</li>
            <li className="cursor-pointer hover:text-blue-500">Tableau de bord</li>
            <li className="cursor-pointer hover:text-blue-500">Mes fichiers</li>
            <li className="cursor-pointer hover:text-blue-500">Paramètres</li>
          </ul>
        </div>

            <div className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition" >
                <LogOut size={18} />
                <Deconnexion/>
            </div>
      </aside>

      {/* --- Contenu principal --- */}
      <main className="flex-1 p-10 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4">
          Bonjour {user.prenom} 
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Bienvenue sur votre tableau de bord personnel.
        </p>

        {/* --- Informations utilisateur --- */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-xl">
          <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
            Vos informations
          </h2>
          <p><strong>Nom :</strong> {user.nom}</p>
          <p><strong>Prénom :</strong> {user.prenom}</p>
          <p><strong>Email :</strong> {user.email}</p>
        </div>

        {/* --- Zone de contenu dynamique (future) --- */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-3">Visualisation des données </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Ici, tu pourras importer des fichiers (CSV, Excel, JSON) et visualiser automatiquement les données
            sous forme de graphiques et tableaux.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
