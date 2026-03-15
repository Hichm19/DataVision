import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { Database, Menu, X } from "lucide-react"

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (id) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false) // Fermer le menu mobile après le clic
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100">
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-10 py-3 sm:py-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center">
            <Database size={14} className="text-violet-500" />
          </div>
          <span className="font-bold text-slate-800 text-base tracking-tight">
            DataVision
          </span>
        </div>

        {/* Navigation desktop */}
        <div className="hidden md:flex items-center gap-7 text-sm text-slate-500">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); scrollToSection("hero"); }} 
            className="hover:text-slate-800 transition-colors"
          >
            Accueil
          </a>
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); scrollToSection("about"); }} 
            className="hover:text-slate-800 transition-colors"
          >
            À propos
          </a>
        </div>

        {/* Boutons desktop */}
        <div className="hidden md:flex items-center gap-3">
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

        {/* Bouton menu mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-slate-50 transition-colors"
          aria-label="Menu"
        >
          {mobileMenuOpen ? (
            <X size={20} className="text-slate-600" />
          ) : (
            <Menu size={20} className="text-slate-600" />
          )}
        </button>
      </div>

      {/* Menu mobile */}
      <div
        className={`
          md:hidden absolute left-0 right-0 bg-white border-b border-slate-100
          transition-all duration-300 ease-in-out overflow-hidden
          ${mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-4 py-4 space-y-4">
          {/* Liens de navigation */}
          <div className="flex flex-col gap-2">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); scrollToSection("hero"); }} 
              className="px-3 py-2 text-sm text-slate-600 hover:bg-violet-50 hover:text-violet-600 rounded-lg transition-colors"
            >
              Accueil
            </a>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); scrollToSection("about"); }} 
              className="px-3 py-2 text-sm text-slate-600 hover:bg-violet-50 hover:text-violet-600 rounded-lg transition-colors"
            >
              À propos
            </a>
          </div>

          {/* Boutons d'authentification */}
          <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
            <Link
              to="/connexion"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center border border-violet-200 text-violet-500 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-violet-50 transition-colors"
            >
              Connexion
            </Link>
            <Link
              to="/inscription"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-violet-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-violet-600 transition-colors"
            >
              Inscription
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar