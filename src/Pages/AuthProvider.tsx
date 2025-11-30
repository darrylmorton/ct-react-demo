import { useState, createContext, type ReactNode } from 'react'

type User = {
  username: string
  firstName: string
}

type AuthContextType = {
  user: User
  authToken: string | null
  login: (username: string, firstName: string) => void
  logout: () => void
  authenticate: (authToken: string) => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user')

    return storedUser ? JSON.parse(storedUser) : null
  })

  const [authToken, setAuthToken] = useState<string | null>(() => {
    return localStorage.getItem('authToken')
  })

  const login = (username: string, firstName: string) => {
    const userData = { username, firstName } as User

    setUser(userData)

    localStorage.setItem('user', JSON.stringify(userData))
  }

  const authenticate = (authToken: string) => {
    setAuthToken(authToken)

    localStorage.setItem('authToken', authToken)
  }

  const logout = () => {
    setUser(null)
    setAuthToken(null)

    localStorage.removeItem('user')
    localStorage.removeItem('authToken')
  }

  return (
    <AuthContext.Provider
      value={{ user, authToken, login, logout, authenticate }}
    >
      {children}
    </AuthContext.Provider>
  )
}
