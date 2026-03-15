import React from 'react'
import { Link } from "react-router-dom"
import { Database } from "lucide-react"

function Navbar() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id)
    if (section) section.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className=" fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-10 py-4 bg-white border-b border-slate-100">

     
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center">
          <Database size={14} className="text-violet-500" />
        </div>
        <span className="font-bold text-slate-800 text-base tracking-tight">DataVision</span>
      </div>

      
      <div className="hidden md:flex items-center gap-7 text-sm text-slate-500">
        <a href="#" onClick={() => scrollToSection("hero")}     className="hover:text-slate-800 transition-colors">Accueil</a>
        <a href="#" onClick={() => scrollToSection("about")}    className="hover:text-slate-800 transition-colors">À propos</a>
      </div>

     
      <div className="flex items-center gap-3">
        <Link
          to="/connexion"
          className="border border-violet-200 text-violet-500 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-violet-50 transition-colors"
        >
          Connexion
        </Link>
        <Link
          to="/inscription"
          className="bg-violet-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-violet-600 transition-colors"
        >
          Inscription
        </Link>
      </div>

    </nav>
  )
}

export default Navbar