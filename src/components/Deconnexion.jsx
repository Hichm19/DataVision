import React from 'react'
import { useNavigate } from "react-router-dom"; 

function Deconnexion() {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => {
          localStorage.removeItem("isLogged");
          localStorage.removeItem("currentUser");
          navigate("/connexion");
        }}
        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
      >
        Se déconnecter
      </button>
    </div>
  )
}

export default Deconnexion;
