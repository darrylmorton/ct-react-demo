import { useContext } from 'react'

import { AuthContext, type AuthContextType } from '../Pages/AuthProvider.tsx'

export const useAuth = () => {
  const { user, authToken, login, logout, authenticate } =
    useContext(AuthContext)

  const isAuthorized = () => {
    if (!user) return false

    return user
  }

  return { user, authToken, login, logout, authenticate, isAuthorized }
}
