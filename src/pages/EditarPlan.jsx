import { useEffect, useState } from "react"
import BuscarUsuario from "../components/usuarios/BuscarUsuario"
import Navbar from "../components/Navbar"
import CardAlumno from "../components/usuarios/CardAlumno"
import EditarPlanComponent from "../components/planes/EditarPlanComponent"
import Sidebar from "../components/SideBar"

const EditarPlan = () => {
    const [userData, setUserData] = useState(null)
    const [showNuevoPlan, setShowNuevoPlan] = useState(false)
    const [userId, setUserId] = useState(null)


    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserData(parsedUser);
            setUserId(parsedUser.uid);
            setShowNuevoPlan(true);
        }
    }, [])

    useEffect(() => {
        if (userData) {
            setUserId(userData.uid);
        }
    }, [])



    const handleUserData = (data) => {
        setUserData(data)
        setUserId(data.uid)
        setShowNuevoPlan(false)
    }

    const handleNuevoPlanClick = () => {
        setShowNuevoPlan(true)
    }
    return (
        <div className="flex flex-col h-screen">
            <Navbar />      
                <div className="flex flex-1 overflow-hidden">
                    <Sidebar />
                    <div className="container flex-1 mx-auto p-4 mt-4 overflow-auto">
                        <h1 className="text-2xl font-bold text-center bg-zinc-800 p-5 rounded-md text-white w-full mb-4">Editar plan</h1>
                        <BuscarUsuario onUserData={handleUserData} />

                        {
                            userData && (
                                <div className="rounded-md bg-zinc-800 pt-0 p-3 w-full mb-4">
                                    <CardAlumno alumno={userData} onNuevoPlanClick={handleNuevoPlanClick} />
                                </div>

                            )
                        }

                        {userData && showNuevoPlan ? <EditarPlanComponent userUid={userId} /> : ''}
                    </div>
                </div>
        </div>
    )
}

export default EditarPlan