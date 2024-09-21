import { Outlet, Navigate } from 'react-router-dom'
import { Auth } from '../Auth/Auth'

function ProtectedRoute() {
  const token = Auth();
  return token ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoute
