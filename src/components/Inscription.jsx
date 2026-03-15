import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, AlertCircle, Eye, EyeOff, CheckCircle } from "lucide-react";
import ConnexionImg from "../assets/ConnexionImg.jfif";

function Inscription() {
  const [error, setError] = useState("");
  const [succes, setSucces] = useState(false);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nom || !prenom || !email || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs."); return;
    }
    if (!emailRegex.test(email)) {
      setError("Veuillez entrer une adresse e-mail valide."); return;
    }
    if (!passwordRegex.test(password)) {
      setError("Au moins 6 caractères, une lettre et un chiffre."); return;
    }
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas."); return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    if (existingUsers.find((u) => u.email === email)) {
      setError("Un compte avec cet e-mail existe déjà."); return;
    }

    existingUsers.push({ nom, prenom, email, password });
    localStorage.setItem("users", JSON.stringify(existingUsers));

    setError("");
    setSucces(true);
    setTimeout(() => navigate("/connexion"), 1500);
  };

  return (
    <div className="w-screen h-screen flex">

      {/* Panneau gauche — image */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden">
        <img
          src={ConnexionImg}
          alt="Inscription visual"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-violet-900/70 via-violet-800/30 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10">
          <p className="text-xs font-semibold text-violet-200 uppercase tracking-widest mb-2">
            DataVision
          </p>
          <h2 className="text-3xl font-bold text-white leading-snug">
            Commencez à explorer<br />vos données dès aujourd'hui.
          </h2>
        </div>
      </div>

      {/* Panneau droit — formulaire */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-12 py-10 overflow-y-auto">

        {/* Lien connexion */}
        <div className="flex justify-end mb-8">
          <p className="text-sm text-slate-400">
            Déjà un compte ?{" "}
            <Link to="/connexion" className="text-violet-500 font-semibold hover:underline">
              Se connecter
            </Link>
          </p>
        </div>

        {/* Header */}
        <div className="mb-7">
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-2">
            Nouveau compte
          </p>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            Inscription
          </h1>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Nom + Prénom */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-xs font-semibold text-slate-500">Nom</label>
              <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-4 py-3 focus-within:border-violet-300 transition-colors bg-slate-50">
                <User size={14} className="text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={nom}
                  placeholder="Doe"
                  onChange={(e) => setNom(e.target.value)}
                  className="bg-transparent outline-none text-sm text-slate-700 placeholder-slate-400 w-full"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-xs font-semibold text-slate-500">Prénom</label>
              <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-4 py-3 focus-within:border-violet-300 transition-colors bg-slate-50">
                <User size={14} className="text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={prenom}
                  placeholder="John"
                  onChange={(e) => setPrenom(e.target.value)}
                  className="bg-transparent outline-none text-sm text-slate-700 placeholder-slate-400 w-full"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500">Adresse e-mail</label>
            <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-4 py-3 focus-within:border-violet-300 transition-colors bg-slate-50">
              <Mail size={14} className="text-slate-400 shrink-0" />
              <input
                type="email"
                value={email}
                placeholder="exemple@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent outline-none text-sm text-slate-700 placeholder-slate-400 w-full"
              />
            </div>
          </div>

          {/* Mot de passe */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500">Mot de passe</label>
            <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-4 py-3 focus-within:border-violet-300 transition-colors bg-slate-50">
              <Lock size={14} className="text-slate-400 shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Votre mot de passe"
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent outline-none text-sm text-slate-700 placeholder-slate-400 w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-600 transition-colors shrink-0"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            <p className="text-xs text-slate-400 pl-1">
              Au moins 6 caractères, une lettre et un chiffre.
            </p>
          </div>

          {/* Confirmation */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500">Confirmer le mot de passe</label>
            <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-4 py-3 focus-within:border-violet-300 transition-colors bg-slate-50">
              <Lock size={14} className="text-slate-400 shrink-0" />
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                placeholder="Confirmez le mot de passe"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-transparent outline-none text-sm text-slate-700 placeholder-slate-400 w-full"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="text-slate-400 hover:text-slate-600 transition-colors shrink-0"
              >
                {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {/* Erreur */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm text-red-400">
              <AlertCircle size={14} className="shrink-0" />
              {error}
            </div>
          )}

          {/* Succès */}
          {succes && (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 text-sm text-emerald-500">
              <CheckCircle size={14} className="shrink-0" />
              Inscription réussie ! Redirection en cours...
            </div>
          )}

          {/* Bouton */}
          <button
            type="submit"
            className="w-full bg-violet-500 hover:bg-violet-600 text-white text-sm font-semibold py-3 rounded-xl transition-colors mt-1"
          >
            Créer mon compte
          </button>

        </form>
      </div>
    </div>
  );
}

export default Inscription;