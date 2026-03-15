import Navbar from "./components/Navbar.jsx"
import Accueil from "./pages/Accueil.jsx"
import { Routes, Route, useLocation } from "react-router-dom"
import Connexion from "./components/Connexion.jsx"
import Inscription from "./components/Inscription.jsx"
import Global from "./components/connected/global.jsx"
import Dashboard from "./components/connected/dashboard.jsx"
import Historique from "./components/connected/historique.jsx"
import Parametre from "./components/connected/parametre.jsx"

const pagesConnectees = ["/dashboard", "/historique", "/parametres"]

function App() {
  const location = useLocation()
  const isConnected = pagesConnectees.includes(location.pathname)

  return (
    <div>
      {!isConnected && <Navbar />}
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />

        <Route element={<Global />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/historique" element={<Historique />} />
          <Route path="/parametres" element={<Parametre />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App