import { useEffect, useState } from "react"
import BuscarUsuario from "../components/usuarios/BuscarUsuario"
import Navbar from "../components/Navbar"
import CardAlumno from "../components/usuarios/CardAlumno"
import NuevoPlan from "../components/planes/NuevoPlan"
import Sidebar from "../components/SideBar"


const AgregarPlan = () => {

  const [userData, setUserData] = useState(null)
  const [showNuevoPlan, setShowNuevoPlan] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUserData(JSON.parse(localStorage.getItem('user')))
      setShowNuevoPlan(true)
      console.log(userData)
    }

  }, [])



  const handleUserData = (data) => {
    setUserData(data)
  }

  const handleNuevoPlanClick = () => {
    setShowNuevoPlan(true)
  }
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar/>
        <div className="container mx-auto grid grid-cols-1 gap-4 mt-4 p-4 h-fit">
          <h1 className="text-2xl font-bold text-center bg-zinc-800 p-5 rounded-md text-white w-full">Agregar plan</h1>
          <BuscarUsuario onUserData={handleUserData} />
          {
            userData && (
              <div className="rounded-md bg-zinc-800 pt-0 p-3 w-full">
                <CardAlumno alumno={userData} onNuevoPlanClick={handleNuevoPlanClick} />
              </div>

            )
          }

          {showNuevoPlan && <NuevoPlan userId={userData.uid} />}

        </div>
      </div>
    </div>
  )
}

export default AgregarPlan