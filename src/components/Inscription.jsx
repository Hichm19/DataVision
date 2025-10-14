import React, { useState } from "react";

function Inscription() {
  const [error, setError] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nom || !prenom || !email || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs.")
      return;
    }

    
    if (!emailRegex.test(email)) {
      setError("Veuillez entrer une adresse e-mail valide.")
      return;
    }

    
    if (!passwordRegex.test(password)) {
      setError(
        "Le mot de passe doit contenir au moins 6 caractères, dont au moins une lettre et un chiffre."
      );
      return;
    }

    
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.")
      return;
    }

    
    const existingUsers = JSON.parse(localStorage.getItem("users")) || []
    const userExists = existingUsers.find((user) => user.email === email)

    if (userExists) {
      setError("Un compte avec cet e-mail existe déjà.")
      return;
    }

    const infoUser = { nom, prenom, email, password }
    existingUsers.push(infoUser);
    localStorage.setItem("users", JSON.stringify(existingUsers))

    setNom("")
    setPrenom("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setError("")

    alert("Inscription réussie ! Vous pouvez maintenant vous connecter.")
  };

  return (
    <div className="w-screen h-full bg-gray-50 dark:bg-gray-800 flex flex-col items-center justify-center py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-400 mb-8">
        Inscription
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-[400px] bg-white dark:bg-gray-900 p-8 mb-10 rounded-2xl shadow-lg flex flex-col items-center space-y-6"
      >
        {/* Nom */}
        <div className="w-full flex flex-col items-start gap-2">
          <label className="text-dark dark:text-gray-300">Nom</label>
          <input
            type="text"
            value={nom}
            placeholder="Doe"
            onChange={(e) => setNom(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:ring-2 focus:ring-sky-500 outline-none text-black dark:text-white"
          />
        </div>

        {/* Prénom */}
        <div className="w-full flex flex-col items-start gap-2">
          <label className="text-dark dark:text-gray-300">Prénom</label>
          <input
            type="text"
            value={prenom}
            placeholder="John"
            onChange={(e) => setPrenom(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:ring-2 focus:ring-sky-500 outline-none text-black dark:text-white"
          />
        </div>

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
            Au moins 6 caractères avec des lettres et des chiffres.
          </small>
        </div>

        {/* Confirmation */}
        <div className="w-full flex flex-col items-start gap-2">
          <label className="text-dark dark:text-gray-300">
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirmez le mot de passe"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:ring-2 focus:ring-sky-500 outline-none text-black dark:text-white"
          />
        </div>

        {/* Message d'erreur */}
        {error && (
          <p className="text-red-500 font-medium bg-red-50 dark:bg-red-900/30 p-2 rounded-md w-full text-center">
            {error}
          </p>
        )}

        {/* Bouton */}
        <button
          type="submit"
          className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-6 rounded-lg transition w-full"
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
}

export default Inscription;
