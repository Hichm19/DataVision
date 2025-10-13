import React from 'react'

function Hero() {
  return (
    <section id='hero' className="bg-white dark:bg-gray-900 text-center py-20 px-6">
      <h1 className="text-4xl md:text-6xl font-bold text-blue-900 dark:text-blue-400">
        Bienvenue sur <span className="text-sky-500">DataVision</span>
      </h1>
      <p className="mt-6 text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
        Transformez vos données en tableaux de bord clairs et interactifs.  
        Téléversez vos fichiers, visualisez, analysez et prenez de meilleures décisions.
      </p>
      <button className="mt-8 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg">
        Commencer maintenant
      </button>
    </section>
  );
}

export default Hero