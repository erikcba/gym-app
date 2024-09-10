import { useNavigate } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import { useState } from 'react'
import  { BotonSideBar, BotonSideBarExp } from './BotonSideBar';


const Sidebar = () => {

  const navigate = useNavigate()

  const cerrarSesion = async () => {
    const auth = getAuth()
    try {
      await signOut(auth)
    } catch (error) {
      console.error(error)
    }
    navigate('/')
  }

  const [isOpenUser, setIsOpenUser] = useState(false)

  const toggleMenuUser = () => {
    setIsOpenUser(!isOpenUser)
    if (isOpenPlan) {
      setIsOpenPlan(false)
    }
  }

  const [isOpenPlan, setIsOpenPlan] = useState(false)

  const toggleMenuPlan = () => {
    setIsOpenPlan(!isOpenPlan)
    if (isOpenUser) {
      setIsOpenUser(false)
    }
  }


  return (
    <div className='flex flex-col w-64 bg-zinc-700 sticky top-0 h-svh p-3'>
      <ul className="mt-4 h-full flex flex-col">
        <li className="mb-4 border-b-2 border-zinc-600">
          <BotonSideBar link={'/dashboard'} texto='Dashboard' icono='home-alt-2' />
        </li>
        <li className="mb-4 ">
          <BotonSideBarExp texto='Usuarios' icono1='user' icono2={isOpenUser ? 'chevron-up' : 'chevron-down'} onClick={toggleMenuUser} />
          {isOpenUser ? (
            <div className='flex flex-col bg-zinc-800 p-2 rounded'>
              <BotonSideBar link={'/agregar-alumno'} texto='Agregar alumno' icono='user-plus' />
              <BotonSideBar link={'/editar-alumno'} texto='Editar alumno' icono='id-card' />
              <BotonSideBar link={'/eliminar-alumno'} texto='Eliminar alumno' icono='user-minus' />
            </div>
          ) : (
            <></>
          )}
        </li>
        <li className="mb-4 border-b-2 border-zinc-600">
          <BotonSideBarExp texto='Planes' icono1='book-open' icono2={isOpenPlan ? 'chevron-up' : 'chevron-down'} onClick={toggleMenuPlan} />
          {isOpenPlan ? (
            <div className='flex flex-col bg-zinc-800 p-2 rounded mb-4'>
              <BotonSideBar link={'/agregar-plan'} texto='Agregar plan' icono='list-plus' />
              <BotonSideBar link={'/editar-plan'} texto='Editar plan' icono='edit'/>
              <BotonSideBar link={'/agregar-pendiente'} texto='Agregar Plan Pendiente' icono='loader'/>
              <BotonSideBar link={'/gestion-plantillas'} texto='Gestionar plantillas' icono='book-add' />
              <BotonSideBar link={'/eliminar-plan'} texto='Eliminar plan' icono='trash' />
            </div>
          ) : (
            <></>
          )}
        </li>
        <li>
          <BotonSideBarExp onClick={cerrarSesion} icono1={'log-out'} texto={'Cerrar sesión'} />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
