import { useEffect, useState } from "react"
import BuscarUsuario from "../components/usuarios/BuscarUsuario"
import Navbar from "../components/Navbar"
import CardAlumno from "../components/usuarios/CardAlumno"
import Sidebar from "../components/SideBar"
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig'


const EliminarAlumno = () => {
    const [userData, setUserData] = useState(null)
    const [userId, setUserId] = useState(null)


    const handleUserData = (data) => {
        setUserData(data)
        setUserId(data.uid)
    }

    const handleEliminarAlumno = async (userId) => {
        try {
            const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este alumno? Esta acción no se puede deshacer.")
            if (confirmacion) {
                const alumnoDocRef = doc(db, 'users', userId)
                await deleteDoc(alumnoDocRef)
                alert('Alumno eliminado correctamente')
            } else {
                alert('Operación cancelada')
            }

        } catch (error) {
            console.error("Error al eliminar el alumno:", error)
        }

    }
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <div className="container flex-1 mx-auto p-4 mt-4 overflow-auto">
                    <h1 className="text-2xl font-bold text-center bg-zinc-800 p-5 rounded-md text-white w-full mb-4">Eliminar Alumno</h1>
                    <BuscarUsuario onUserData={handleUserData} />

                    {
                        userData && (
                            <div className="rounded-md bg-zinc-800 pt-0 p-3 w-full mb-4">
                                <CardAlumno alumno={userData} onNuevoPlanClick={() => handleEliminarAlumno(userId)} btnText={'Eliminar'} />
                            </div>

                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default EliminarAlumno