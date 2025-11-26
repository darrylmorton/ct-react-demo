import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'

import './App.css'
import './index.css'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import Logout from './Pages/Logout'
import Profile from './Pages/Profile'
import { AuthProvider } from './Pages/AuthProvider'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="user">
          <Route path="profile" element={<Profile />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)
