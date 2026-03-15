import React from 'react'
import { useNavigate } from "react-router-dom";

function Deconnexion() {
  const navigate = useNavigate();

  const handleDeconnexion = () => {
    localStorage.removeItem("isLogged");
    localStorage.removeItem("currentUser");
    navigate("/connexion");
  };

  return (
    <span onClick={handleDeconnexion}>
      Se déconnecter
    </span>
  );
}

export default Deconnexion;