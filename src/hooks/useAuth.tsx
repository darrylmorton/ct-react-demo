import { useContext } from 'react'

import { AuthContext } from '../Pages/AuthProvider.tsx'

export const useAuth = () => {
  const { user, token, login, logout, setAuthToken } = useContext(AuthContext)

  const isAuthorized = () => {
    if (!user) return false

    return user
  }

  return { user, token, login, logout, setAuthToken, isAuthorized }
}
