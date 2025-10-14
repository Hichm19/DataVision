import Navbar from "./components/Navbar.jsx"
import Accueil from "./pages/Accueil.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Connexion from "./components/Connexion.jsx"
import Inscription from "./components/Inscription.jsx"
import Dashboard from "./components/connected/dashboard.jsx"

function App() {
  return (
    
      <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
      </div>
    
  )
}

export default App
