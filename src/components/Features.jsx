import React from 'react'
import { BarChart3, Upload, Share2, LayoutDashboard } from 'lucide-react';
function Features() {
  const features = [
    {
      icon: <Upload className="w-10 h-10 text-sky-500" />,
      title: 'Téléversement intelligent',
      desc: 'Importez vos fichiers CSV, Excel ou JSON en toute simplicité et sécurité.',
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-sky-500" />,
      title: 'Visualisation automatique',
      desc: 'Vos données sont transformées en graphiques interactifs en un clic.',
    },
    {
      icon: <LayoutDashboard className="w-10 h-10 text-sky-500" />,
      title: 'Tableaux de bord dynamiques',
      desc: 'Créez et personnalisez vos dashboards selon vos besoins.',
    },
    {
      icon: <Share2 className="w-10 h-10 text-sky-500" />,
      title: 'Exportation et partage',
      desc: 'Exportez vos visualisations en image, PDF ou partagez-les avec vos collègues.',
    },
  ];

  return (
    <section id='features' className="py-20 bg-gray-50 dark:bg-gray-800 text-center px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-400 mb-12">
        Les fonctionnalités de <span className="text-sky-500">DataVision</span>
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 hover:shadow-2xl transition duration-300"
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-blue-900 dark:text-sky-400 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features