import React from 'react'
import {useState} from "react"

function Connexion() {
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleOnline = (e) => {
        e.preventDefault() 

        if (email === "" || password === "") {
            setError("Veuillez remplir tous les champs")
            return
        }

        
        const storedUsers = JSON.parse(localStorage.getItem("users")) || []

        if (storedUsers.length === 0) {
            setError("Aucun utilisateur inscrit") 
            return
        }

        
        const userData = storedUsers.find(user => user.email === email)

        if (!userData) {
            setError("Aucun compte trouvé avec cet email")
            return
        }

        if (password !== userData.password) {
            setError("Mot de passe incorrect")
            return
        }

        setError("")
        console.log("Connexion réussie pour " + email)
        
        
        localStorage.setItem("isLogged", "true")
        localStorage.setItem("currentUser", JSON.stringify({
            nom: userData.nom,
            prenom: userData.prenom,
            email: userData.email
        }))
        
        
        alert("Bienvenue " + userData.prenom + " " + userData.nom + " sur votre dashboard")
        
        setEmail("")
        setPassword("")
    }

    return (
        <div className='w-screen h-screen bg-gray-50 dark:bg-gray-800'>
            <div className='flex items-center justify-center flex-col gap-6'>
                <h1 className='text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-400 mb-5 mt-8'>Connexion</h1>
                <form onSubmit={handleOnline} className='w-[400px] max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg space-y-6 flex flex-col items-center justify-center gap-6'>
                    <div className="flex flex-col items-start justify-center gap-6">
                        <label className='text-dark dark:text-gray-300'>Email</label>
                        <input 
                            type="email" 
                            value={email}
                            placeholder='exemple@gmail.com' 
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-[300px] p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:ring-2 focus:ring-sky-500 outline-none text-black dark:text-white'    
                        />
                    </div>
                    <div className="flex flex-col items-start justify-center gap-6">
                        <label className='text-dark dark:text-gray-300'>Mot de passe</label>
                        <input 
                            type="password" 
                            value={password}
                            placeholder='Mot de passe' 
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-[300px] p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:ring-2 focus:ring-sky-500 outline-none text-black dark:text-white'    
                        />
                    </div>
                    {error && <p className="text-red-500 font-medium">{error}</p>}
                    <button
                        type='submit'
                        className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-6 rounded-lg transition"
                    >
                        Se Connecter
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Connexion