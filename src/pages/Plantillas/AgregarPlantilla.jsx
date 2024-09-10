import Navbar from '../../components/Navbar'
import NuevaPlantilla from '../../components/Plantillas/NuevaPlantilla'
import Sidebar from '../../components/SideBar'
import VolverBtn from '../../components/VolverBtn'

const AgregarPlantilla = () => {
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
                            Crear plantilla
                        </span>
                    </h1>
                    <NuevaPlantilla />

                </div>
            </div>
        </div>
    )
}

export default AgregarPlantilla