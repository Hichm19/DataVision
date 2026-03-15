import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BarChart2, Upload, Sparkles } from 'lucide-react'

function Hero() {
  return (
    <section id="hero" className="bg-slate-50 px-10 pt-24 pb-28">

      {/* Badge */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-2 bg-violet-50 border border-violet-100 text-violet-500 text-xs font-semibold px-4 py-1.5 rounded-full">
          <Sparkles size={12} />
          Analyse de données simplifiée
        </div>
      </div>

      {/* Titre */}
      <div className="text-center max-w-3xl mx-auto mb-6">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-800 tracking-tight leading-tight">
          Transformez vos données
          <br />
          en <span className="text-violet-500">décisions claires</span>
        </h1>
      </div>

      {/* Sous-titre */}
      <p className="text-center text-slate-500 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
        Importez vos fichiers CSV, visualisez vos données en quelques secondes
        et générez des graphiques interactifs sans effort.
      </p>

      {/* CTA */}
      <div className="flex justify-center items-center gap-4 mb-20">
        <Link
          to="/inscription"
          className="flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors shadow-sm"
        >
          Commencer gratuitement
          <ArrowRight size={15} />
        </Link>
        <Link
          to="/connexion"
          className="flex items-center gap-2 border border-slate-200 text-slate-600 hover:bg-slate-100 px-6 py-3 rounded-xl text-sm font-medium transition-colors"
        >
          Se connecter
        </Link>
      </div>

      {/* Cards features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {[
          {
            Icon: Upload,
            title: "Import CSV",
            desc: "Glissez vos fichiers et laissez DataVision faire le reste.",
          },
          {
            Icon: BarChart2,
            title: "Visualisation",
            desc: "Graphiques en barres, lignes ou camembert générés automatiquement.",
          },
          {
            Icon: Sparkles,
            title: "Détection auto",
            desc: "Le meilleur graphique est sélectionné selon vos données.",
          },
        ].map(({ Icon, title, desc }) => (
          <div
            key={title}
            className="bg-white border border-slate-100 rounded-2xl px-5 py-5 flex flex-col gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center">
              <Icon size={16} className="text-violet-500" />
            </div>
            <p className="text-sm font-semibold text-slate-700">{title}</p>
            <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

    </section>
  )
}

export default Hero