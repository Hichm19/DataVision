import React from 'react'
import {useState} from "react"

function Inscription() {
    const [error, setError]= useState("")
    const [nom , setNom] =useState("")
    const [prenom, setPrenom]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    
    const handleSubmit = (e)=>{
        e.preventDefault()

        if (!nom || !prenom || !email || !password || !confirmPassword){
            setError("Veuillez remplir tous les champs")
            return
        }

        if (password !== confirmPassword){
            setError("Les mots de passe ne correspondent pas")
            return
        }

        setError("")
        console.log('Nom =', nom );
        console.log('Prenom =', prenom );

        const infoUser = {
            nom,
            prenom,
            email,
            password,
            confirmPassword
        }

        console.log(infoUser)

        const existingUsers = JSON.parse(localStorage.getItem("users")) || []

        
        const userExists = existingUsers.find(user => user.email === email)
        if (userExists) {
            setError("Un compte avec cet email existe déjà")
            return
        }

        existingUsers.push(infoUser)

        localStorage.setItem("users", JSON.stringify(existingUsers))

        setNom("")
        setPrenom("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")

        alert("Inscription réussie !")
    }

    return (
        <div className='w-screen h-full bg-gray-50 dark:bg-gray-800  ' >
            <div className='flex items-center justify-center flex-col gap-6'>
                <h1 className='text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-400 mb-5 mt-8'>Inscription</h1>
                <form   onSubmit={handleSubmit}  className='w-[400px] max-w-2xl mx-auto bg-white dark:bg-gray-900 p-4 mb-7 rounded-2xl shadow-lg space-y-6 flex flex-col items-center justify-center gap-6' >

                    <div className=" flex flex-col items-start justify-center gap-6">
                        <label className='text-dark dark:text-gray-300' >Nom</label>
                        <input 
                            type="text" 
                            value={nom}
                            placeholder='Doe' 
                            onChange={(e) => setNom(e.target.value)}
                            className=' w-[300px] p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:ring-2 focus:ring-sky-500 outline-none  text-black dark:text-white'    
                        />
                    </div>
                    <div className=" flex flex-col items-start justify-center gap-6">
                        <label className='text-dark dark:text-gray-300' >Prenom</label>
                        <input 
                            type="text" 
                            value={prenom}
                            placeholder='Jonh' 
                            onChange={(e)=>setPrenom(e.target.value)}
                            className=' w-[300px] p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:ring-2 focus:ring-sky-500 outline-none  text-black dark:text-white'    
                        />
                    </div>
                    <div className=" flex flex-col items-start justify-center gap-6">
                        <label className='text-dark dark:text-gray-300' >Email</label>
                        <input 
                            type="text" 
                            value={email}
                            placeholder='exemple@gmail.com' 
                            onChange={(e)=>setEmail(e.target.value)}
                            className=' w-[300px] p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:ring-2 focus:ring-sky-500 outline-none  text-black dark:text-white'    
                        />
                    </div>
                    <div className=" flex flex-col items-start justify-center gap-6" >
                        <label className='text-dark dark:text-gray-300' >Mot de passe</label>
                        <input 
                            type="password" 
                            value={password}
                            placeholder='Mot de passe' 
                            onChange={(e)=>setPassword(e.target.value)}
                            className='w-[300px] p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:ring-2 focus:ring-sky-500 outline-none  text-black dark:text-white'    
                        />
                    </div>
                    <div className=" flex flex-col items-start justify-center gap-6">
                        <label className='text-dark dark:text-gray-300' >Confirm mot de passe</label>
                        <input 
                            type="password" 
                            value={confirmPassword}
                            placeholder='Confirm mot de passe' 
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                            className=' w-[300px] p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:ring-2 focus:ring-sky-500 outline-none  text-black dark:text-white'    
                        />
                    </div>
                    {error && <p className="text-red-500 font-medium">{error}</p>}
                    <button
                        type='submit'
                        className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-6 rounded-lg transition"
                    >S'inscrire</button>
                </form>
            </div>
        </div>
    )
}

export default Inscription