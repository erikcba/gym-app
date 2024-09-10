import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import Inicio from './pages/Inicio.jsx'
import './index.css'
import AgregarPlan from './pages/AgregarPlan.jsx'
import AgregarAlumno from './pages/AgregarAlumno.jsx'
import EditarPlan from './pages/EditarPlan.jsx'
import AgregarPlanPendiente from './pages/AgregarPlanPendiente.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AgregarPlantilla from './pages/Plantillas/AgregarPlantilla.jsx'
import GestionPlantilla from './pages/Plantillas/GestionPlantilla.jsx'
import AsignarPlantilla from './pages/Plantillas/AsignarPlantilla.jsx'
import EditarPlantilla from './pages/Plantillas/EditarPlantilla.jsx'
import EliminarAlumno from './pages/EliminarAlumno.jsx'

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute> } />
        <Route path="/agregar-plan" element={<ProtectedRoute><AgregarPlan /></ProtectedRoute>} />
        <Route path="/editar-plan" element={<ProtectedRoute><EditarPlan /></ProtectedRoute>} />
        <Route path="/gestion-plantillas" element={<ProtectedRoute><GestionPlantilla/></ProtectedRoute>} />
        <Route path="/agregar-plantilla-plan" element={<ProtectedRoute><AgregarPlantilla /></ProtectedRoute>} />
        <Route path="/asignar-plantilla" element={<ProtectedRoute><AsignarPlantilla/></ProtectedRoute>} />
        <Route path="/editar-plantilla" element={<ProtectedRoute><EditarPlantilla/></ProtectedRoute>} />
        <Route path="/agregar-alumno" element={<ProtectedRoute><AgregarAlumno /></ProtectedRoute>} />
        <Route path="/eliminar-alumno" element={<ProtectedRoute><EliminarAlumno /></ProtectedRoute>} />
        <Route path="/agregar-pendiente" element={<ProtectedRoute><AgregarPlanPendiente /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
