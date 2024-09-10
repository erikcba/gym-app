import Navbar from '../../components/Navbar'
import EditarPlantillaComponent from '../../components/Plantillas/EditarPlantillaComponent'
import Plantillas from '../../components/Plantillas/Plantillas'
import Sidebar from '../../components/SideBar'
import VolverBtn from '../../components/VolverBtn'
import { useState } from 'react'


const EditarPlantilla = () => {
    const [plantillaId, setPlantillaId] = useState(null)

    const handleEditarPlantilla = (plan) => {
        setPlantillaId(plan.id)
    }


    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1 ">
                <Sidebar />
                <div className="container flex flex-col items-center mx-auto my-5 gap-5">
                    <h1 className="text-2xl font-bold text-center bg-zinc-800 p-5 rounded-md text-white w-full flex items-center justify-center">
                        <span>
                            <VolverBtn link={'/gestion-plantillas'} />
                        </span>
                        <span className='mx-auto'>
                            Seleccionar una plantilla
                        </span>
                    </h1>
                    <Plantillas handleClick={handleEditarPlantilla} btnText={'Editar'} />
                    {
                        plantillaId && <EditarPlantillaComponent plan={plantillaId} /> 
                    }
                </div>
            </div>
        </div>
    )
}

export default EditarPlantilla