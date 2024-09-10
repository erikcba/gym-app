import Navbar from '../components/Navbar'
import { auth, db } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, collection, addDoc, setDoc } from 'firebase/firestore'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/SideBar';


const AgregarAlumno = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [rolError, setRolError] = useState('')
    const [objetivo, setObjetivo] = useState('')
    const [dni, setDni] = useState('')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)


    const loader = 
        <svg
            className="animate-spin h-5 w-5 mr-3 text-white"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
        </svg>

    const handleSignUp = async (e) => {
            e.preventDefault()
        try {
            setLoading(true)
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        const userData = {
            name: name.toLocaleLowerCase(),
        email,
        role: 'Alumno',
        uid: user.uid,
        assignedPlans: [],
        estadoPlan: 'Pendiente',
        objetivo,
        dni
            }

        const userRef = doc(db, 'users', user.uid)
        const planPendienteRef = doc(db, 'planesPendientes', user.uid)

        await setDoc(userRef, userData)
        await setDoc(planPendienteRef, userData)

        alert('Usuario creado exitosamente')
        setLoading(false)
        navigate('/dashboard')
        } catch (error) {
            console.error('Error signing up:', error.code, error.message)
            setError(error.message)
        }
    }

        return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <div className="container flex flex-col items-center mx-auto p-4 mt-4 gap-5">
                    <h1 className="text-2xl font-bold text-center bg-zinc-800 p-5 rounded-md text-white w-full">Agregar alumno</h1>
                    <div className="bg-zinc-800 flex flex-col justify-center items-center w-full rounded-md p-6">

                        <div className="w-96 text-center ">
                            <h2 className="text-white text-2xl font-bold text-center mb-5">Datos del alumno</h2>
                            <form onSubmit={handleSignUp} className="flex flex-col gap-4" >
                                <div className="flex flex-col gap-2 text-white">
                                    <input onChange={(e) => setName(e.target.value)} type="text" id="name" name="name" placeholder="Nombre completo" className="p-2 bg-zinc-800 rounded-sm border-b-2 border-cyan-500 text-center focus:outline-none focus:border-cyan-300 " required />
                                </div>
                                <div className="flex flex-col gap-2 text-white">
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" placeholder="Correo electrónico" className="p-2 bg-zinc-800 rounded-sm border-b-2 border-cyan-500 text-center focus:outline-none focus:border-cyan-300 " required />
                                </div>
                                <div className="flex flex-col gap-2 text-white">
                                    <input onChange={(e) => setObjetivo(e.target.value)} type="text" id="objetivo" name="objetivo" placeholder="Objetivo del alumno" className="p-2 bg-zinc-800 rounded-sm border-b-2 border-cyan-500 text-center focus:outline-none focus:border-cyan-300 " required />
                                </div>
                                <div className="flex flex-col gap-2 text-white">
                                    <input onChange={(e) => setDni(e.target.value)} type="text" id="dni" name="dni" placeholder="DNI del alumno" className="p-2 bg-zinc-800 rounded-sm border-b-2 border-cyan-500 text-center focus:outline-none focus:border-cyan-300 " required />
                                </div>

                                <div className="flex flex-col gap-2 text-white">
                                    <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" placeholder="Contraseña" className="p-2 bg-zinc-800 rounded-sm border-b-2 border-cyan-500 text-center focus:outline-none focus:border-cyan-300 " required />
                                </div>
                                <div className="flex flex-col gap-2 text-white ">
                                    <p className="text-red-500 mb-3 text-center">{rolError ? rolError : ''}</p>
                                    <button type="submit" className="font-semibold font-lg p-2 bg-blue-900 rounded-md hover:bg-blue-700 flex items-center justify-center text-white w-full">{loading ? loader : 'Crear usuario'}</button>
                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div >
        )
}

        export default AgregarAlumno