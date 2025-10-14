import React from 'react'
import {useState} from "react"
import { Link,Navigate } from "react-router-dom"
import Connexion from "./Connexion"
import Deconnexion from "./Deconnexion"
function Navbar() {

  const [isLoggedIn, setIsLoggedIn]=useState(false)

   const scrollToSection = (id) =>{
          const section = document.getElementById(id)
          if (section) {
          section.scrollIntoView({ behavior: 'smooth' })
      }
      }

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-white shadow-md" >

      <div className="text-22xl font-bold text-blue-900" >DataVision</div>
      <div>
        <nav className='hidden md:flex space-x-6 text-blue-900'>

          {!isLoggedIn && (
            <>
              <a href="#" onClick={()=>scrollToSection("hero")} className='hover:text-blue-500'>Accueil</a>
              <a href="#" onClick={()=>scrollToSection("features")} className='hover:text-blue-500'>Fonctionnalités</a>
              <a href="#" onClick={()=>scrollToSection("about")} className='hover:text-blue-500'>À propos</a>
              <a href="#" onClick={()=>scrollToSection("contact")} className='hover:text-blue-500'>Support</a>
            </>
              
          )}  
          {isLoggedIn && (
            <>
              <a href="#" className='hover:text-blue-500'>Tableau de bord</a>
              <a href="#" className='hover:text-blue-500'>Historique</a>
              <a href="#" className='hover:text-blue-500'>Profil</a>
              <a href="#" className='hover:text-blue-500'>Aide</a>
            </>
          )}

        </nav>
        
        

        
      
      <div className='flex gap-3'>
        {!isLoggedIn ? (
          <>
            <button  onClick={()=>setIsLoggedIn(true)} className='border-blue-500 text-blue-500 px-4 pyy-1.5 rounded-md hover:bg-blue-50'>
              <Link to="/connexion">Connexion</Link>
            </button>
            <button className='bg-blue-500 text-white px-4 py-1.5 rounded-md hover:bg-blue-600' >
              <Link to="/inscription">Inscription</Link>
            </button>
          </>
        ): (
          <div>
            <Deconnexion/>
          </div> 
        )}
      </div>

      </div>

    </div>
  )
}

export default Navbar