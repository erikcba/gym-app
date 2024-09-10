import { useState } from "react"
import { auth, db } from '../../../firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate } from "react-router-dom";



const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [rolError, setRolError] = useState('')

    const navigate = useNavigate()

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            await updateProfile(user, {
                displayName: name
            })
            await setDoc(doc(db, 'users', user.uid), {
                name: name.toLocaleLowerCase(),
                email,
                role: 'Admin',
                uid: user.uid,
                assignedPlans: [],
                estadoPlan: 'Pendiente'
            })
            navigate('/dashboard')
        } catch (error) {
            console.error('Error signing up:', error.code, error.message)
            setError(error.message)
        }
    }

    return (

        <div className="bg-zinc-800 flex flex-col justify-center items-center w-96">

            <div className="w-full text-center">
                <h2 className="text-white text-2xl font-bold text-center mb-5">Crea una cuenta</h2>
                <form onSubmit={handleSignUp} className="flex flex-col gap-4" >
                    <div className="flex flex-col gap-2 text-white">
                        <input onChange={(e) => setName(e.target.value)} type="text" id="name" name="name" placeholder="Nombre completo" className="p-2 bg-zinc-800 rounded-sm border-b-2 border-cyan-500 text-center focus:outline-none focus:border-cyan-300 " required />
                    </div>
                    <div className="flex flex-col gap-2 text-white">
                        <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" placeholder="Correo electrónico" className="p-2 bg-zinc-800 rounded-sm border-b-2 border-cyan-500 text-center focus:outline-none focus:border-cyan-300 " required />
                    </div>
                    <div className="flex flex-col gap-2 text-white">
                        <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" placeholder="Contraseña" className="p-2 bg-zinc-800 rounded-sm border-b-2 border-cyan-500 text-center focus:outline-none focus:border-cyan-300 " required />
                    </div>
                    <div className="flex flex-col gap-2 text-white ">
                        <p className="text-red-500 mb-3 text-center">{rolError ? rolError : ''}</p>
                        <button type="submit" className="font-semibold font-lg p-2 bg-blue-900 rounded-md hover:bg-blue-700">Registrarse</button>
                    </div>

                </form>
            </div>

        </div>


    )
}

export default SignUp