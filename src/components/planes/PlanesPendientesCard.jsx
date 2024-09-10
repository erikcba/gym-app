import { useEffect, useState } from 'react'
import { db } from '../../../firebaseConfig'
import { collection,  getDocs } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const PlanesPendientesCard = ({ boxicon }) => {

    const [isVisible, setIsVisible] = useState(true)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [planesPendientes, setPlanesPendientes] = useState([])


    const toggleListVisibility = () => {
        setIsVisible(!isVisible)
    }

    const fetchPlanesPendientes = async () => {
        try {
            const planesPendientesRef = collection(db, 'planesPendientes')
            const querySnapshot = await getDocs(planesPendientesRef)

            const planesPendientesData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            setPlanesPendientes(planesPendientesData)
            setLoading(false)
            return planesPendientesData
        } catch (error) {
            console.error('Error fetching planesPendientes:', error.message)
        }
    }

    useEffect(() => {
        setLoading(true)
        fetchPlanesPendientes()
    }, [])

    const handleClick = (user) => {
        localStorage.setItem('user', JSON.stringify(user))
        navigate('/agregar-plan')
    }

    const verMas = <box-icon name='chevron-down' size='md' color='#f3f0f0'></box-icon>
    const verMenos = <box-icon name='chevron-up' size='md' color='#f3f0f0'></box-icon>



    return (
        <div className='bg-zinc-800 p-4 rounded-md text-white flex flex-col gap-4 items-center justify-between drop-shadow'>
            <div className='flex gap-4 items-center justify-between w-full'>
                <h1 className='font-semibold text-xl flex items-center gap-2 border-b-2 border-zinc-700 w-full pb-5'>{boxicon} Planes pendientes</h1>
                {<button onClick={toggleListVisibility} className='bg-blue-800  rounded-lg hover:bg-blue-600 w-9 h-9 font-bold'>{isVisible ? verMenos : verMas}</button>}
            </div>
            {

                loading ? (
                    <div className="flex items-center justify-center gap-2">
                        <p>Cargando</p>
                        <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">                            <circle
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
                            ></path></svg>
                    </div>

                ) : error ? (
                    <p>{error}</p>
                ) : isVisible ? (
                    planesPendientes.length > 0 ? (
                        <table className='w-full table-auto mt-4'>
                            <thead className='bg-zinc-900 text-white py-4'>
                                <tr>
                                    <th className='px-4 py-2'>Nombre</th>
                                    <th className='px-4 py-2'>DNI</th>
                                    <th className='px-4 py-2'>Objetivo</th>
                                    <th className='px-4 py-2'>Estado</th>
                                    <th className='px-4 py-2'>Acción</th>
                                </tr>
                            </thead>
                            <tbody className='rounded'>
                                {planesPendientes.map((plan, index) => (
                                    <tr className='even:bg-zinc-700' key={index}>
                                        <td className='text-center px-4 py-2 capitalize'>{plan.name}</td>
                                        <td className='text-center px-4 py-2'>{plan.dni}</td>
                                        <td className='text-center px-4 py-2'>{plan.objetivo}</td>
                                        <td className='text-center px-4 py-2'>{plan.estadoPlan}</td>
                                        <td className='text-center px-4 py-2'>
                                            <button onClick={() => handleClick(plan)} className='bg-blue-800 py-1 px-3 rounded-lg hover:bg-blue-600'>Agregar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No hay planes pendientes para mostrar</p>
                    )

                ) : ''}
        </div>
    )
}

export default PlanesPendientesCard