import { Navigate, Outlet } from 'react-router'

import { useAuth } from '../../hooks/useAuth'

export const ProtectedRoutes = () => {
  const { authToken } = useAuth()

  if (!authToken) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
