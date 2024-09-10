import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { db } from "../../../firebaseConfig"
import { doc, getDoc, collection, getDocs } from "firebase/firestore"

const VerPlan = () => {
    const [userId, setUserId] = useState("");
    const [nombrePlan, setNombrePlan] = useState("");
    const [days, setDays] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const uid = user.uid;
                    setUserId(uid);

                    const userDocRef = doc(db, "users", uid);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        const userData = userDocSnap.data();
                        const assignedPlanId = userData.assignedPlans;

                        if (assignedPlanId) {
                            // Obtener los datos del plan asignado
                            const planDocRef = doc(db, "planes", assignedPlanId);
                            const planDocSnap = await getDoc(planDocRef);

                            if (planDocSnap.exists()) {
                                const planData = planDocSnap.data();
                                setNombrePlan(planData.name);

                                // Obtener los días y ejercicios
                                const daysRef = collection(planDocRef, "days");
                                const daysSnapshot = await getDocs(daysRef);
                                const daysData = daysSnapshot.docs.map((doc) => doc.data());

                                setDays(daysData);
                            } else {
                                setError("El documento del plan no existe.");
                            }
                        } else {
                            setError("El usuario no tiene un plan asignado.");
                        }
                    } else {
                        setError("El documento del usuario no existe.");
                    }
                } catch (error) {
                    console.error("Error al obtener los datos del usuario:", error);
                    setError("Error al obtener los datos del usuario.");
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
                setError("No hay usuario autenticado.");
            }
        });

        return () => unsubscribe();


    }, [])



    return (
        <>
            <div className="container flex flex-col items-center justify-center mx-auto gap-5 rounded-md bg-zinc-800 p-5 my-5">
                <h1 className="text-2xl font-bold text-center text-white">Mi plan</h1>
                <div className="flex flex-col items-center justify-center gap-5 w-full">
                    <div className="flex flex-col items-center justify-center gap-2 border-b-2 border-zinc-500 w-full">
                        < h3 className="text-lg font-semibold text-center text-white text-capitalize">{nombrePlan}</h3>
                    </div>

                    {days.length > 0 ? (days.map((day, dayIndex) => (
                        <div className='w-full' key={dayIndex}>
                            <h2 className='text-lg font-semibold text-center text-white'>{day.name}</h2>
                            <table className='w-full table-auto mt-4'>
                                <thead className='bg-zinc-900 text-white py-4'>
                                    <tr>
                                        <th className='px-4 py-2'>Ejercicio</th>
                                        <th className='px-4 py-2'>Series</th>
                                        <th className='px-4 py-2'>Repeticiones</th>
                                        <th className='px-4 py-2'>Anotaciones</th>
                                    </tr>
                                </thead>
                                <tbody className='rounded'>
                                    {day.exercises.map((exercise, exerciseIndex) => (
                                        <tr className='even:bg-zinc-700' key={exerciseIndex}>
                                            <td className='text-center px-4 py-2 text-white'>{exercise.name}</td>
                                            <td className='text-center px-4 py-2 text-white'>{exercise.sets}</td>
                                            <td className='text-center px-4 py-2 text-white'>{exercise.reps}</td>
                                            <td className='text-center px-4 py-2 text-white'><button className='bg-zinc-900 hover:bg-zinc-600 text-white font-bold py-2 px-4 rounded'>+</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    )))
                        : loading ?
                            <div className="flex items-center justify-center gap-2">
                                <p className='text-lg font-semibold text-center text-white'>Cargando</p>
                                <svg className="animate-spin h-5 w-5 mr-3 text-zinc-400" viewBox="0 0 24 24"> <circle
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
                            : <h2 className='text-lg font-semibold text-center text-white'>No hay plan para mostrar</h2>
                    }

                </div>
            </div>
        </>
    )
}

export default VerPlan