import { useState } from 'react'
import { db } from '../../../firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const NuevaPlantilla = () => {

    const navigate = useNavigate()
    const [nombrePlan, setNombrePlan] = useState('')
    const [days, setDays] = useState(([{ name: '', exercises: [{ name: '', sets: '', reps: '' }] }]))

    const handleAddDay = () => {
        setDays([...days, { name: '', exercises: [{ name: '', sets: '', reps: '' }] }])
    }

    const handleAddExercise = (dayIndex) => {
        const newDays = [...days]
        newDays[dayIndex].exercises.push({ name: '', sets: '', reps: '' })
        setDays(newDays)
    }

    const handleDayChange = (index, value) => {
        const newDays = [...days]
        newDays[index].name = value
        setDays(newDays)
    }

    const handleExerciseChange = (dayIndex, exerciseIndex, field, value) => {
        const newDays = [...days]
        newDays[dayIndex].exercises[exerciseIndex][field] = value
        setDays(newDays)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const planRef = await addDoc(collection(db, 'plantillasPlanes'), {
                name: nombrePlan,
            })

            const daysRef = collection(planRef, 'days')
            for (const day of days) {
                await addDoc(daysRef, day)
            }
            
            alert('Plantilla creada exitosamente')
            navigate('/dashboard')
        } catch (error) {
            console.error('Error al crear el plan:', error)
            alert('Error al crear el plan')
        }
    }
    return (
        <>
            <div className='container flex flex-col items-center justify-center mx-auto gap-5 rounded-md bg-zinc-800 p-5'>
                <h1 className='text-2xl font-bold text-center text-white'>Nueva plantilla</h1>
                <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-5 w-full'>

                    <div className='flex flex-col items-center justify-center gap-2 border-b-2 border-zinc-500 w-full'>
                        <h2 className='text-xl font-semibold text-center text-white'>Nombre del plan</h2>
                        <input value={nombrePlan} onChange={(e) => setNombrePlan(e.target.value)} type="text" placeholder="Ej: Fullbody 3 dias" className="text-white p-2 bg-zinc-800 rounded-sm border-b-2 border-cyan-500 text-center focus:outline-none focus:border-cyan-300 mb-5" required />
                    </div>

                    {days.map((day, dayIndex) => (
                        <div key={dayIndex} className="day-section flex flex-col items-center justify-center gap-2 border-b-2 border-zinc-500 w-full">
                            <input
                                type="text"
                                value={day.name}
                                onChange={(e) => handleDayChange(dayIndex, e.target.value)}
                                placeholder={`Nombre del Día ${dayIndex + 1}`}
                                className="text-white p-2 bg-zinc-800 rounded-sm border-b-2 border-cyan-500 text-center focus:outline-none focus:border-cyan-300"
                                required
                            />
                            {day.exercises.map((exercise, exerciseIndex) => (
                                <div key={exerciseIndex} className="exercise-section flex items-center justify-center gap-2">
                                    <input
                                        type="text"
                                        value={exercise.name}
                                        onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'name', e.target.value)}
                                        placeholder="Nombre del Ejercicio"
                                        className="text-white p-2 bg-zinc-800 rounded-sm border-b-2 border-cyan-500 text-center focus:outline-none focus:border-cyan-300"
                                        required
                                    />
                                    <input
                                        type="number"
                                        value={exercise.sets}
                                        onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'sets', e.target.value)}
                                        placeholder="Series"
                                        className="text-white p-2 bg-zinc-800 rounded-sm border-b-2 border-cyan-500 text-center focus:outline-none focus:border-cyan-300"
                                        required
                                    />
                                    <input
                                        type="number"
                                        value={exercise.reps}
                                        onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'reps', e.target.value)}
                                        placeholder="Repeticiones"
                                        className="text-white p-2 bg-zinc-800 rounded-sm border-b-2 border-cyan-500 text-center focus:outline-none focus:border-cyan-300"
                                        required
                                    />
                                    <button className='bg-red-600 text-white flex justify-center items-center py-1 px-2 my-auto rounded-lg hover:bg-red-500 font-semibold' type="button" onClick={() => {
                                        const newDays = [...days]
                                        newDays[dayIndex].exercises.splice(exerciseIndex, 1)
                                        setDays(newDays)
                                    }} ><box-icon name='trash' color='#f3f0f0' ></box-icon></button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => handleAddExercise(dayIndex)}
                                className="bg-green-500 text-white p-2 rounded-md hover:bg-green-400 my-4"
                            >
                                Agregar Ejercicio
                            </button>
                        </div>
                    ))}
                    <div className='flex items-center justify-center gap-2'>
                        <button type="button" onClick={handleAddDay} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-400">
                            Agregar Día
                        </button>

                        <button type="submit" className="bg-blue-900 text-white p-2 rounded-md hover:bg-blue-700">
                            Crear Plan
                        </button>
                    </div>


                </form>
            </div>
        </>
    )
}

export default NuevaPlantilla