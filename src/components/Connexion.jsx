import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, AlertCircle, Eye, EyeOff } from "lucide-react";
import ConnexionImg from "../assets/ConnexionImg.jfif";

function Connexion() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const handleOnline = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Veuillez entrer une adresse e-mail valide.");
      return;
    }
    if (!passwordRegex.test(password)) {
      setError("Le mot de passe doit contenir au moins 6 caractères, une lettre et un chiffre.");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    if (storedUsers.length === 0) { setError("Aucun utilisateur inscrit."); return; }

    const userData = storedUsers.find((user) => user.email === email);
    if (!userData) { setError("Aucun compte trouvé avec cet e-mail."); return; }
    if (password !== userData.password) { setError("Mot de passe incorrect."); return; }

    setError("");
    localStorage.setItem("isLogged", "true");
    localStorage.setItem("currentUser", JSON.stringify({
      nom: userData.nom,
      prenom: userData.prenom,
      email: userData.email,
    }));

    navigate("/dashboard");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-screen h-screen flex">

      {/* Panneau gauche — image */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden">
        <img
          src={ConnexionImg}
          alt="Connexion visual"
          className="w-full h-full object-cover"
        />
        {/* Overlay dégradé */}
        <div className="absolute inset-0 bg-gradient-to-t from-violet-900/70 via-violet-800/30 to-transparent" />

        {/* Texte sur l'image */}
        <div className="absolute bottom-10 left-10 right-10">
          <p className="text-xs font-semibold text-violet-200 uppercase tracking-widest mb-2">
            DataVision
          </p>
          <h2 className="text-3xl font-bold text-white leading-snug">
            Vos données,<br />visualisées clairement.
          </h2>
        </div>
      </div>

      {/* Panneau droit — formulaire */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-12 py-16">

        {/* Lien inscription */}
        <div className="flex justify-end mb-10">
          <p className="text-sm text-slate-400">
            Pas encore de compte ?{" "}
            <Link to="/inscription" className="text-violet-500 font-semibold hover:underline">
              S'inscrire
            </Link>
          </p>
        </div>

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-2">
            Bienvenue
          </p>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            Connexion
          </h1>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleOnline} className="flex flex-col gap-5">

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500">
              Adresse e-mail
            </label>
            <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-4 py-3 focus-within:border-violet-300 transition-colors bg-slate-50">
              <Mail size={15} className="text-slate-400 shrink-0" />
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
            <label className="text-xs font-semibold text-slate-500">
              Mot de passe
            </label>
            <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-4 py-3 focus-within:border-violet-300 transition-colors bg-slate-50">
              <Lock size={15} className="text-slate-400 shrink-0" />
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
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
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

          {/* Bouton */}
          <button
            type="submit"
            className="w-full bg-violet-500 hover:bg-violet-600 text-white text-sm font-semibold py-3 rounded-xl transition-colors mt-1"
          >
            Se connecter
          </button>

        </form>
      </div>
    </div>
  );
}

export default Connexion;