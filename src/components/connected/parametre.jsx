import React, { useState } from 'react'
import { User, Mail, Pencil, X, Check, AlertCircle } from 'lucide-react'

function Parametre() {
  const [nouveauNom, setNouveauNom] = useState("");
  const [nouveauPrenom, setNouveauPrenom] = useState("");
  const [nouvelEmail, setNouvelEmail] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [erreur, setErreur] = useState("");
  const [succes, setSucces] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || {}
  );
  const { nom, prenom, email } = currentUser;

  const handleOpen = () => {
    setNouveauNom(nom || "");
    setNouveauPrenom(prenom || "");
    setNouvelEmail(email || "");
    setErreur("");
    setSucces(false);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErreur("");

    if (nouveauNom.trim() === "" || nouveauPrenom.trim() === "" || nouvelEmail.trim() === "") {
      setErreur("Veuillez remplir tous les champs.");
      return;
    }
    if (!emailRegex.test(nouvelEmail)) {
      setErreur("Veuillez entrer une adresse e-mail valide.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUser = { ...currentUser, nom: nouveauNom, prenom: nouveauPrenom, email: nouvelEmail };
    const updatedUsers = users.map(u => u.email === email ? updatedUser : u);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setCurrentUser(updatedUser);
    setSucces(true);
    setTimeout(() => {
      setShowForm(false);
      setSucces(false);
    }, 1200);
  };

  return (
    <div>
      {/* Header */}
      <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-1">
        Paramètres
      </p>
      <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-8">
        Mon profil
      </h1>

      <div className="max-w-xl">

        {/* Carte infos */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-base font-bold text-violet-600">
                {prenom?.[0]}{nom?.[0]}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">{prenom} {nom}</p>
                <p className="text-xs text-slate-400">{email}</p>
              </div>
            </div>
            <button
              onClick={showForm ? () => setShowForm(false) : handleOpen}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                showForm
                  ? "border-slate-200 text-slate-500 hover:bg-slate-50"
                  : "border-violet-200 text-violet-500 hover:bg-violet-50"
              }`}
            >
              {showForm ? <><X size={14} /> Annuler</> : <><Pencil size={14} /> Modifier</>}
            </button>
          </div>

          {/* Champs affichage */}
          <div className="space-y-3">
            {[
              { label: "Nom",    value: nom,    Icon: User },
              { label: "Prénom", value: prenom, Icon: User },
              { label: "Email",  value: email,  Icon: Mail },
            ].map(({ label, value, Icon }) => (
              <div key={label} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100">
                <Icon size={14} className="text-slate-400 shrink-0" />
                <span className="text-xs text-slate-400 w-14 shrink-0">{label}</span>
                <span className="text-sm text-slate-700 font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Formulaire */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4">
              Modifier les informations
            </p>

            {erreur && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-4 text-sm text-red-400">
                <AlertCircle size={14} />
                {erreur}
              </div>
            )}

            {succes && (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 mb-4 text-sm text-emerald-500">
                <Check size={14} />
                Informations mises à jour !
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500">Nom</label>
                <input
                  type="text"
                  value={nouveauNom}
                  onChange={(e) => setNouveauNom(e.target.value)}
                  placeholder="Nouveau nom"
                  className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-300 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500">Prénom</label>
                <input
                  type="text"
                  value={nouveauPrenom}
                  onChange={(e) => setNouveauPrenom(e.target.value)}
                  placeholder="Nouveau prénom"
                  className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-300 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500">Email</label>
                <input
                  type="email"
                  value={nouvelEmail}
                  onChange={(e) => setNouvelEmail(e.target.value)}
                  placeholder="Nouvel email"
                  className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-300 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-violet-500 hover:bg-violet-600 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
              >
                Enregistrer les modifications
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

export default Parametre;