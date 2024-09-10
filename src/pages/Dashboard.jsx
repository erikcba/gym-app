import Navbar from '../components/Navbar.jsx'
import CardOpciones from '../components/CardOpciones.jsx'
import PlanesPendientesCard from '../components/planes/PlanesPendientesCard.jsx'
import { useEffect } from 'react'
import Sidebar from '../components/SideBar.jsx'

const Dashboard = () => {

  useEffect(() => {
    localStorage.removeItem('user')
    console.log("Dashboard")
  }, [])

  return (
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-1 p-4 overflow-auto">
            <div className='container mx-auto grid grid-cols-2 gap-4 mt-4'>
              <CardOpciones titulo="Agregar Alumno" boxicon={<box-icon name='user-plus' color='#bdb9b9'></box-icon>} link={'/agregar-alumno'} />
              <CardOpciones titulo="Agregar plan pendiente" boxicon={<box-icon name='loader' color='#bdb9b9'></box-icon>} link={'/agregar-pendiente'} />
              <CardOpciones titulo="Agregar Plan" boxicon={<box-icon name='list-plus' color='#bdb9b9'></box-icon>} link={'/agregar-plan'} />
              <CardOpciones titulo="Editar Plan" boxicon={<box-icon name='edit' type='solid' color='#bdb9b9'></box-icon>} link={'/editar-plan'} />
            </div>
            <div className='container mx-auto grid grid-cols-1 gap-4 mt-4'>
              <PlanesPendientesCard boxicon={<box-icon name='error-circle' color='#bdb9b9'></box-icon>} />
            </div>
          </div>
        </div>
      </div>
  )
}

export default Dashboard
