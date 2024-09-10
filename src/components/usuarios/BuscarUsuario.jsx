import { useState } from 'react'
import { db } from '../../../firebaseConfig'
import { collection, query, where, getDocs } from 'firebase/firestore'

const BuscarUsuario = ({onUserData}) => {

    const [nombre, setNombre] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSearch = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const q = query(collection(db, 'users'), where('name', '==', nombre.toLocaleLowerCase()))
            const querySnapshot = await getDocs(q)

            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data()
                onUserData(userData)
                setLoading(false)
            } else {
                setError('Usuario no encontrado')
                onUserData(null)
            }
        } catch (error) {
            console.error('Error al buscar usuario:', error)
            setError('Error al buscar usuario')
            onUserData(null)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <form onSubmit={handleSearch} className="flex flex-col items-center justify-center gap-4 bg-zinc-800 p-5 rounded-md w-full">
                <h3 className="text-2xl font-bold text-center text-white">Buscar alumno</h3>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder='Busca por nombre' className="text-white p-2 bg-zinc-800 rounded-sm border-b-2 border-cyan-500 text-center focus:outline-none focus:border-cyan-300 w-96" />
                <button
                    type="submit"
                    className="bg-blue-900 text-white text-center p-2 rounded-md hover:bg-blue-700 flex items-center justify-center w-96"
                >
                    {loading ? (
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
                    ) : (
                        'Buscar'
                    )}
                </button>
            </form>

            
            {error && <p className="text-red-500">{error}</p>}

        </>
    )
}

export default BuscarUsuario