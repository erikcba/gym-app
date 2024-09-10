import { useEffect } from "react"
import { db } from '../../../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { useState } from "react"


const Plantillas = ({ userId, handleClick, btnText }) => {

    const [isVisible, setIsVisible] = useState(true)
    const [isVisiblePlan, setIsVisiblePlan] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [plantillas, setPlantillas] = useState([])
    const [selectedPlan, setSelectedPlan] = useState(null)

    const handleVerPlantilla = (plan) => {
        setSelectedPlan(plan)
        setIsVisiblePlan(!isVisiblePlan)
    }

    const loader = <div className="flex items-center justify-center gap-2 bg-zinc-800 p-4 rounded-md text-white">
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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const plantillaDocRef = collection(db, 'plantillasPlanes')
                const querySnapshot = await getDocs(plantillaDocRef)

                if (!querySnapshot.empty) {
                    const plantillasData = await Promise.all(querySnapshot.docs.map(async (doc) => {
                        const plantilla = doc.data()
                        const daysRef = collection(doc.ref, 'days') // Acceder a la subcolección "days" dentro de cada plantilla
                        const daysSnapshot = await getDocs(daysRef)
                        const daysData = daysSnapshot.docs.map(dayDoc => dayDoc.data())

                        return { id: doc.id, ...plantilla, days: daysData } // Retorna la plantilla junto con sus días
                    }))

                    setPlantillas(plantillasData)
                    console.log(plantillasData) // Aquí tienes las plantillas con sus días

                } else {
                    setError('Plantillas no encontradas')
                    setPlantillas(null)
                }

            } catch (error) {
                console.error('Error al buscar plantillas:', error)
                setError('Error al buscar plantillas')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])


    return (

        <div className="flex h-full w-full">
            <div className="container flex flex-col items-center mx-auto gap-5">
                {
                    loading ? (
                        <div className="flex items-center justify-center gap-2 bg-zinc-800 p-4 rounded-md text-white">
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
                        plantillas.length > 0 ? (
                            <div className="container flex flex-col items-center mx-auto gap-5 bg-zinc-800 p-4 rounded-md text-white">
                                <h1 className="text-2xl font-bold text-center p-5 text-white border-b-2 border-zinc-700 w-full">Plantillas disponibles</h1>
                                <table className='w-full table-auto mt-4 bg-zinc-800 p-4 rounded-md text-white'>
                                    <thead className='bg-zinc-900 text-white py-4'>
                                        <tr>
                                            <th className='px-4 py-2'>Nombre</th>
                                            <th className='px-4 py-2'>Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody className='rounded'>
                                        {plantillas.map((plan, index) => (
                                            <tr className='even:bg-zinc-700' key={index}>
                                                <td className='text-center px-4 py-2 capitalize'>{plan.name}</td>
                                                <td className='text-center px-4 py-2 flex items-center gap-2 justify-center'>
                                                    <button onClick={() => handleVerPlantilla(plan)} className='bg-blue-800 py-1 px-3 rounded-lg hover:bg-blue-600'>Ver</button>
                                                    <button onClick={() => handleClick(plan)} className='bg-blue-800 py-1 px-3 rounded-lg hover:bg-blue-600'>{loading ? loader : btnText}</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                        ) : (
                            <p>No hay plantillas para mostrar</p>
                        )

                    ) : ''}

                {
                    selectedPlan ? (
                        <div className="container mx-auto p-4 rounded-md text-white bg-zinc-800 mt-5">
                            <div className="flex items-center justify-center gap-4 py-4">
                                <button className="bg-blue-800 py-1 px-3 rounded-lg hover:bg-blue-600 flex items-center justify-center" onClick={() => setSelectedPlan(null)}><box-icon name='low-vision' color='#f3f0f0'></box-icon></button>
                                <h2 className="text-xl font-bold text-center ">{selectedPlan.name}</h2>
                            </div>
                            {selectedPlan.days.map((day, dayIndex) => (
                                <div key={dayIndex} className="mb-8">
                                    <h3 className="text-lg font-semibold mb-2 text-center">{day.name}</h3>
                                    <table className='w-full table-auto  '>
                                        <thead className='bg-zinc-900 text-white py-4'>
                                            <tr>
                                                <th className='px-4 py-2 w-2/4'>Ejercicio</th>
                                                <th className='px-4 py-2 w-1/4'>Series</th>
                                                <th className='px-4 py-2 w-1/4'>Repeticiones</th>
                                            </tr>
                                        </thead>
                                        <tbody className='rounded mb-4'>
                                            {day.exercises.map((exercise, exerciseIndex) => (
                                                <tr className='even:bg-zinc-700' key={exerciseIndex}>
                                                    <td className='text-center px-4 py-2'>{exercise.name}</td>
                                                    <td className='text-center px-4 py-2'>{exercise.sets}</td>
                                                    <td className='text-center px-4 py-2'>{exercise.reps}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>

                    ) : (
                        ''
                    )
                }


            </div>
        </div>

    )
}

export default Plantillas