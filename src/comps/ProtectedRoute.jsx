import { Navigate, useLocation } from 'react-router-dom'
import { getAuthToken } from '../config/api'

const ProtectedRoute = ({ children }) => {
  const location = useLocation()
  const isAuthenticated = Boolean(getAuthToken())
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute