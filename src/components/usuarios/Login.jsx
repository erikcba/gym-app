
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)


    const handleLogIn = async (e) => {
        e.preventDefault()
        const auth = getAuth()
        setLoading(true)
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/dashboard")
        } catch (error) {
            setError(true)
            setLoading(false)
        }

    }
    return (
        <div className="bg-zinc-800 flex flex-col justify-center items-center w-96">

            <div className="w-full text-center relative">

                <h1 className="text-white text-2xl font-bold text-center mb-5">Inicia sesion</h1>
                <form onSubmit={handleLogIn} className="flex flex-col gap-4" >
                    <div className="flex flex-col gap-2 text-white">
                        <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" placeholder="Correo electrónico" className="p-2 bg-zinc-800 rounded-sm border-b-2 border-cyan-500 text-center focus:outline-none focus:border-cyan-300 " />
                    </div>
                    <div className="flex flex-col gap-2 text-white">
                        <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" placeholder="Contraseña" className="p-2 bg-zinc-800 rounded-sm border-b-2 border-cyan-500 text-center focus:outline-none focus:border-cyan-300 " />
                    </div>
                    <p className="text-red-500 font-semibold">{error ? 'Usuario o contraseña incorrecos' : ''}</p>
                    <button type="submit" className="flex justify-center items-center gap-2 font-semibold font-lg p-2 bg-blue-900 rounded-md hover:bg-blue-700 text-white">{loading ? (<svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
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
                        ></path></svg>) : 'Iniciar sesion'} </button>
                </form>
            </div>

        </div>
    )
}

export default Login