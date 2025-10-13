import React from 'react'

function About() {
  return (
    <section
      id="about"
      className="py-20 bg-white dark:bg-gray-900 px-6 flex flex-col md:flex-row items-center justify-center gap-12"
    >
      <div className="max-w-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-400 mb-6">
          À propos de <span className="text-sky-500">DataVision</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          DataVision est une plateforme conçue pour aider les entreprises à
          visualiser facilement leurs données, même sans équipe technique.
          Grâce à une interface intuitive, elle transforme vos fichiers
          Excel ou CSV en tableaux de bord interactifs.
        </p>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Notre mission : rendre la data accessible à tous. Que vous soyez une
          petite entreprise ou une grande structure, DataVision vous aide à
          comprendre vos chiffres et à prendre des décisions éclairées.
        </p>
      </div>

      <div className="max-w-md">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4149/4149670.png"
          alt="Data visualization illustration"
          className="rounded-2xl shadow-lg w-full dark:opacity-90"
        />
      </div>
    </section>
  );
}

export default About