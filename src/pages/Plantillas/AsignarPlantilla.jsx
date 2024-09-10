import { useState } from "react"
import BuscarUsuario from "../../components/usuarios/BuscarUsuario"
import Navbar from "../../components/Navbar"
import CardAlumno from "../../components/usuarios/CardAlumno"
import Sidebar from "../../components/SideBar"
import VolverBtn from "../../components/VolverBtn"
import Plantillas from "../../components/Plantillas/Plantillas"
import { db } from '../../../firebaseConfig'
import { doc, collection, addDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'

const AsignarPlantilla = () => {

    const [userData, setUserData] = useState(null)
    const [showPlantillas, setShowPlantillas] = useState(false)
    const userId = userData?.uid
    const [loading, setLoading] = useState(false)


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


    const handleClick = async (plan) => {
        try {
            // Referencia al documento del usuario
            const userDocRef = doc(db, 'users', userId)
            setLoading(true)

            const planRef = await addDoc(collection(db, 'planesActivos'), {
                name: plan.name,
            })

            const planId = planRef.id

            const daysRef = collection(planRef, 'days')
            for (const day of plan.days) {
                await addDoc(daysRef, day)
            }

            // Obtener el documento del usuario para verificar si existe
            const userSnap = await getDoc(userDocRef);
            if (userSnap.exists()) {
                // Actualizar el documento del usuario con el ID del plan y cambiar el estado del plan
                await updateDoc(userDocRef, {
                    assignedPlans: planId, // Usar el ID del plan que has pasado como argumento
                    estadoPlan: 'Activo'
                })
            }

            // Eliminar el plan pendiente si existe
            const planPendienteRef = doc(db, 'planesPendientes', userId);
            const planPendienteSnap = await getDoc(planPendienteRef);
            if (planPendienteSnap.exists()) {
                await deleteDoc(planPendienteRef);
            }
            setLoading(false)
            alert('Plan asignado correctamente');

        } catch (error) {
            console.error("Error al asignar la plantilla:", error);
            alert("Hubo un error al asignar la plantilla");
        }

    }


    const handleUserData = (data) => {
        setUserData(data)
    }

    const handleNuevoPlanClick = () => {
        setShowPlantillas(true)
        console.log(userData)
    }

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar />
                <div className="container flex flex-col items-center mx-auto my-5 gap-5">
                    <h1 className="text-2xl font-bold text-center bg-zinc-800 p-5 rounded-md text-white w-full flex items-center">
                        <span className='mr-auto'>
                            <VolverBtn link={'/gestion-plantillas'} />
                        </span>
                        <span className='mr-auto'>
                            Asignar plantilla
                        </span>
                    </h1>
                    <BuscarUsuario onUserData={handleUserData} />
                    {
                        userData && (
                            <div className="rounded-md bg-zinc-800 pt-0 p-3 w-full">
                                <CardAlumno alumno={userData} onNuevoPlanClick={handleNuevoPlanClick} />
                            </div>
                        )
                    }
                    {showPlantillas && <Plantillas userId={userId} handleClick={handleClick} btnText={'Asignar'} />}
                </div>
            </div>
        </div>
    )
}

export default AsignarPlantilla