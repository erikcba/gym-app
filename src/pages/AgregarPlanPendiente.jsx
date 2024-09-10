import { useState } from 'react'
import Navbar from '../components/Navbar'
import BuscarUsuario from '../components/usuarios/BuscarUsuario'
import CardAgregarPendiente from '../components/usuarios/CardAgregarPendiente'
import { db } from '../../firebaseConfig'
import { doc, updateDoc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/SideBar'



const AgregarPlanPendiente = () => {
    const [userData, setUserData] = useState(null)
    const navigate = useNavigate()

    const handleUserData = (data) => {
        setUserData(data)
    }

    const agregarPendiente = async (e) => {
        e.preventDefault()
        const userId = userData.uid
        try {
            await updateDoc(doc(db, 'users', userId), {
                estadoPlan: 'Pendiente'
            })
            const planPendienteRef = doc(db, 'planesPendientes', userId)
            await setDoc(planPendienteRef, userData)
            alert('Operacion exitosa')
            navigate('/dashboard')
        } catch (error) {
            console.error('Error al crear el plan:', error)
            alert('Error al crear el plan')
        }
    }

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar/>
                <div className='container mx-auto grid grid-cols-1 gap-4 mt-4 p-4 h-fit'>
                    <h1 className='text-2xl font-bold text-center text-white bg-zinc-800 p-5 rounded-md'>Agregar plan pendiente</h1>
                    <BuscarUsuario onUserData={handleUserData} />
                    {
                        userData && (
                            <div className="rounded-md bg-zinc-800 pt-0 p-3 w-full">
                                <CardAgregarPendiente alumno={userData} select={agregarPendiente} />
                            </div>

                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default AgregarPlanPendiente