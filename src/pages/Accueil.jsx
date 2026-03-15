import React from 'react'
import NavBar from "../components/Navbar"
import Hero from "../components/Hero"
import Footer from "../components/Footer"
import About from "../components/About"

function Accueil() {
   
  return (
    <div>
        <NavBar/>
        <Hero/>
        <About/>
        <Footer/>
    </div>
  )
}

export default Accueil