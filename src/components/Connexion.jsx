import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Connexion() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
 
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
      setError(
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un symbole."
      );
      return;
    }

    
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (storedUsers.length === 0) {
      setError("Aucun utilisateur inscrit.");
      return;
    }

    
    const userData = storedUsers.find((user) => user.email === email);

    if (!userData) {
      setError("Aucun compte trouvé avec cet e-mail.");
      return;
    }

    
    if (password !== userData.password) {
      setError("Mot de passe incorrect.");
      return;
    }

    
    setError("");
    localStorage.setItem("isLogged", "true");
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        nom: userData.nom,
        prenom: userData.prenom,
        email: userData.email,
      })
    );

    alert(
      `Bienvenue ${userData.prenom} ${userData.nom} sur votre dashboard !`
    );

    
    navigate("/dashboard");

    
    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-screen h-screen bg-gray-50 dark:bg-gray-800 flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-400 mb-8">
        Connexion
      </h1>

      <form
        onSubmit={handleOnline}
        className="w-[400px] bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg space-y-6 flex flex-col items-center"
      >
        {/* Email */}
        <div className="w-full flex flex-col items-start gap-2">
          <label className="text-dark dark:text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            placeholder="exemple@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:ring-2 focus:ring-sky-500 outline-none text-black dark:text-white"
          />
        </div>

        {/* Mot de passe */}
        <div className="w-full flex flex-col items-start gap-2">
          <label className="text-dark dark:text-gray-300">Mot de passe</label>
          <input
            type="password"
            value={password}
            placeholder="Mot de passe"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:ring-2 focus:ring-sky-500 outline-none text-black dark:text-white"
          />
          <small className="text-gray-400 text-sm">
            Au moins 8 caractères, une majuscule, une minuscule, un chiffre et
            un symbole.
          </small>
        </div>

        {/* Message d’erreur */}
        {error && (
          <p className="text-red-500 font-medium bg-red-50 dark:bg-red-900/30 p-2 rounded-md w-full text-center">
            {error}
          </p>
        )}

        {/* Bouton de connexion */}
        <button
          type="submit"
          className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-6 rounded-lg transition w-full"
        >
          Se Connecter
        </button>
      </form>
    </div>
  );
}

export default Connexion;
