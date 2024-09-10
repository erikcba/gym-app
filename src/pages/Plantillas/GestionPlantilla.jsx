import CardOpciones from '../../components/CardOpciones'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/SideBar'
import VolverBtn from '../../components/VolverBtn'

const AgregarPlantilla = () => {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <div className="flex-1 p-4 overflow-auto">
                    <div className="container flex flex-col items-center mx-auto my-5 gap-5">
                        <h1 className="text-2xl font-bold text-center bg-zinc-800 p-5 rounded-md text-white w-full flex items-center justify-center">
                            <span className='mr-auto'>
                                <VolverBtn link={'/dashboard'} />
                            </span>
                            <span className='mr-auto'>
                                Gestionar plantillas
                            </span>
                        </h1>
                        <div className='container mx-auto grid grid-cols-2 gap-4 mt-4'>
                            <CardOpciones titulo="Crear Plantilla" boxicon={<box-icon name='list-plus' color='#bdb9b9'></box-icon>} link={'/agregar-plantilla-plan'} />
                            <CardOpciones titulo="Asignar Plantilla" boxicon={<box-icon name='user-check' color='#bdb9b9'></box-icon>} link={'/asignar-plantilla'} />
                            <CardOpciones titulo="Editar Plantilla" boxicon={<box-icon name='edit' type='solid' color='#bdb9b9'></box-icon>} link={'/editar-plantilla'} />
                            <CardOpciones titulo="Eliminar plantilla" boxicon={<box-icon name='trash' color='#bdb9b9'></box-icon>} link={'/agregar-pendiente'} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AgregarPlantilla