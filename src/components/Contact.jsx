import React from 'react'

function Contact() {
  return (
    <section
      id='contact'
      className="py-20 bg-gray-50 dark:bg-gray-800 px-6 text-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-400 mb-8">
        Besoin d’aide ? <span className="text-sky-500">Contactez-nous</span>
      </h2>

      <form className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg space-y-6">
        <input
          type="text"
          placeholder="Votre nom"
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:ring-2 focus:ring-sky-500 outline-none text-black dark:text-white"
        />

        <input 
          type="email"
          placeholder="Votre email"
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:ring-2 focus:ring-sky-500 outline-none  text-black dark:text-white"
        />

        <textarea
          placeholder="Votre message..."
          rows="5"
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:ring-2 focus:ring-sky-500 outline-none  text-black dark:text-white"
        ></textarea>

        <button
          type="submit"
          className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-6 rounded-lg transition"
        >
          Envoyer le message
        </button>
      </form>
    </section>
  );
}

export default Contact