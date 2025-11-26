import { useState, createContext, type ReactNode } from 'react'

type User = {
  username: string
  firstName: string
}

type AuthContextType = {
  user: User
  token: string | null
  login: (username: string, firstName: string) => void
  logout: () => void
  setAuthToken: (token: string) => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user')

    return storedUser ? JSON.parse(storedUser) : null
  })

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token')
  })

  const login = (username: string, firstName: string) => {
    const userData = { username, firstName } as User

    setUser(userData)

    localStorage.setItem('user', JSON.stringify(userData))
  }

  const setAuthToken = (authToken: string) => {
    setToken(authToken)

    localStorage.setItem('token', authToken)
  }

  const logout = () => {
    setUser(null)
    setToken(null)

    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  )
}
