import { useContext } from 'react'

import { AuthContext } from '../Pages/AuthProvider.tsx'

export const useAuth = () => {
  const auth = useContext(AuthContext)

  if (!auth) throw new Error('useAuth must be used within AuthProvider')

  const { user, authToken, login, logout, authenticate } = auth

  const isAuthorized = () => {
    return user
  }

  return { user, authToken, login, logout, authenticate, isAuthorized }
}
