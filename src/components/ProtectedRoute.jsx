import { Navigate } from 'react-router-dom'
import { useAuth } from '../js/useAuth.jsx'


const ProtectedRoute = ({children}) => {
    const user = useAuth()

    if (!user){
        return <Navigate to="/" />
    }


  return children
}

export default ProtectedRoute