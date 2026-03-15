import React from 'react'
import { BarChart2, Users, Zap, ShieldCheck } from 'lucide-react'

const stats = [
  { value: "100%", label: "Sans code" },
  { value: "CSV",  label: "Format supporté" },
  { value: "3",    label: "Types de graphiques" },
  { value: "∞",    label: "Fichiers importables" },
]

const valeurs = [
  {
    Icon: Zap,
    title: "Rapidité",
    desc: "Vos données sont visualisées en quelques secondes après l'import.",
  },
  {
    Icon: Users,
    title: "Accessibilité",
    desc: "Aucune compétence technique requise. Tout le monde peut l'utiliser.",
  },
  {
    Icon: ShieldCheck,
    title: "Confidentialité",
    desc: "Vos données restent dans votre navigateur, rien n'est envoyé en ligne.",
  },
  {
    Icon: BarChart2,
    title: "Clarté",
    desc: "Des graphiques adaptés automatiquement à la nature de vos données.",
  },
]

function About() {
  return (
    <section id="about" className="bg-white px-10 py-24">

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3">
          À propos
        </p>
        <h2 className="text-4xl font-bold text-slate-800 tracking-tight mb-5">
          La data, accessible à <span className="text-violet-500">tout le monde</span>
        </h2>
        <p className="text-slate-500 text-base leading-relaxed">
          DataVision est une plateforme conçue pour aider les entreprises à visualiser
          facilement leurs données, même sans équipe technique. Elle transforme vos
          fichiers CSV en tableaux de bord interactifs en quelques clics.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
        {stats.map(({ value, label }) => (
          <div
            key={label}
            className="bg-slate-50 border border-slate-100 rounded-2xl px-5 py-6 text-center"
          >
            <p className="text-3xl font-bold text-violet-500 mb-1">{value}</p>
            <p className="text-xs text-slate-400 font-medium">{label}</p>
          </div>
        ))}
      </div>

      {/* Valeurs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {valeurs.map(({ Icon, title, desc }) => (
          <div
            key={title}
            className="flex items-start gap-4 bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5"
          >
            <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
              <Icon size={16} className="text-violet-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-1">{title}</p>
              <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}

export default About