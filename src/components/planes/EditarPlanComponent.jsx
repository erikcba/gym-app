import { useEffect, useState } from "react"
import { db } from "../../../firebaseConfig"
import { doc, getDoc, collection, getDocs, updateDoc, addDoc, deleteDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

const EditarPlanComponent = ({ userUid }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [nombrePlan, setNombrePlan] = useState("")
  const [days, setDays] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        const userDocRef = doc(db, "users", userUid)
        const userDocSnap = await getDoc(userDocRef)

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data()
          const assignedPlanId = userData.assignedPlans

          if (assignedPlanId) {
            // Obtener los datos del plan asignado
            const planDocRef = doc(db, "planesActivos", assignedPlanId)
            const planDocSnap = await getDoc(planDocRef)

            if (planDocSnap.exists()) {
              const planData = planDocSnap.data()
              setNombrePlan(planData.name)

              // Obtener los días y ejercicios
              const daysRef = collection(planDocRef, "days")
              const daysSnapshot = await getDocs(daysRef)
              const daysData = daysSnapshot.docs.map((doc) => doc.data())

              setDays(daysData)
            } else {
              setError("El documento del plan no existe.")
            }
          } else {
            setError("El usuario no tiene un plan asignado.")
          }
        } else {
          setError("El documento del usuario no existe.")
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error)
        setError("Error al obtener los datos del usuario.")
      } finally {
        setLoading(false)
      }
    }

    fetchPlanData()
  }, [userUid])

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

  const handleAddDay = () => {
    setDays([...days, { name: "", exercises: [{ name: "", sets: "", reps: "" }] }])
  }

  const handleAddExercise = (dayIndex) => {
    const newDays = [...days]
    newDays[dayIndex].exercises.push({ name: "", sets: "", reps: "" })
    setDays(newDays)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Obtener el documento del plan asignado
      const userDocRef = doc(db, "users", userUid)
      const userDocSnap = await getDoc(userDocRef)

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data()
        const assignedPlanId = userData.assignedPlans

        if (assignedPlanId) {
          const planDocRef = doc(db, "planesActivos", assignedPlanId)

          // Actualizar los datos del plan
          await updateDoc(planDocRef, { name: nombrePlan })

          // Eliminar los días existentes y agregar los nuevos
          const daysRef = doc(planDocRef, "days")
          const daysSnapshot = await getDocs(daysRef)
          for (const dayDoc of daysSnapshot.docs) {
            await deleteDoc(doc(daysRef, dayDoc.id))
          }

          for (const day of days) {
            await addDoc(daysRef, day)
          }

          alert("Plan actualizado exitosamente")
          navigate("/dashboard")
        } else {
          throw new Error("El usuario no tiene un plan asignado.")
        }
      } else {
        throw new Error("El documento del usuario no existe.")
      }
    } catch (error) {
      console.error("Error al actualizar el plan:", error)
      alert("Error al actualizar el plan")
    }
  }

  if (loading) {
    return <p>Cargando...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto gap-5 rounded-md bg-zinc-800 p-5">
      <h1 className="text-2xl font-bold text-center text-white">Editar plan</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-5 w-full">
        <div className="flex flex-col items-center justify-center gap-2 border-b-2 border-zinc-500 w-full">
          <h2 className="text-xl font-semibold text-center text-white">Nombre del plan</h2>
          <input
            value={nombrePlan}
            onChange={(e) => setNombrePlan(e.target.value)}
            type="text"
            placeholder="Ej: Fullbody 3 dias"
            className="text-white p-2 bg-zinc-800 rounded-sm border-b-2 border-cyan-500 text-center focus:outline-none focus:border-cyan-300 mb-5"
            required
          />
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
                  onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, "name", e.target.value)}
                  placeholder="Nombre del Ejercicio"
                  className="text-white p-2 bg-zinc-800 rounded-sm border-b-2 border-cyan-500 text-center focus:outline-none focus:border-cyan-300"
                  required
                />
                <input
                  type="number"
                  value={exercise.sets}
                  onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, "sets", e.target.value)}
                  placeholder="Series"
                  className="text-white p-2 bg-zinc-800 rounded-sm border-b-2 border-cyan-500 text-center focus:outline-none focus:border-cyan-300"
                  required
                />
                <input
                  type="number"
                  value={exercise.reps}
                  onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, "reps", e.target.value)}
                  placeholder="Repeticiones"
                  className="text-white p-2 bg-zinc-800 rounded-sm border-b-2 border-cyan-500 text-center focus:outline-none focus:border-cyan-300"
                  required
                />
                <button
                  className="bg-red-600 text-white py-1 px-3 my-auto h-1/2 rounded-lg hover:bg-red-500 font-semibold"
                  type="button"
                  onClick={() => {
                    const newDays = [...days]
                    newDays[dayIndex].exercises.splice(exerciseIndex, 1)
                    setDays(newDays)
                  }}
                >
                  X
                </button>
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
        <div className="flex items-center justify-center gap-2">
          <button type="button" onClick={handleAddDay} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-400">
            Agregar Día
          </button>

          <button type="submit" className="bg-blue-900 text-white p-2 rounded-md hover:bg-blue-700">
            Actualizar Plan
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditarPlanComponent