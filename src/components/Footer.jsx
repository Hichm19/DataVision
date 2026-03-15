import React from 'react'
import { Database } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 px-10 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center">
            <Database size={14} className="text-violet-500" />
          </div>
          <span className="font-bold text-slate-800 text-sm tracking-tight">DataVision</span>
        </div>

        {/* Mention */}
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} DataVision. Tous droits réservés.
        </p>

        {/* Liens */}
        <div className="flex items-center gap-5 text-xs text-slate-400">
          <a href="#" className="hover:text-slate-600 transition-colors">Confidentialité</a>
          <a href="#" className="hover:text-slate-600 transition-colors">Conditions</a>
          <a href="#" className="hover:text-slate-600 transition-colors">Contact</a>
        </div>

      </div>
    </footer>
  )
}

export default Footer