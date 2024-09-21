import { Outlet, Navigate } from 'react-router-dom'
import { Auth } from '../Auth/Auth'

function PublicRoute() {
  const token = Auth();
  return token ? <Navigate to='/' /> : <Outlet />
}

export default PublicRoute
