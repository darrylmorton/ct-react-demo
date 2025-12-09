import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'

import './index.css'
import Home from './Pages/Home'
import About from './Pages/About'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Profile from './Pages/Profile'
import Logout from './Pages/Logout'
import { AuthProvider } from './Components/Auth/AuthProvider'
import { ProtectedRoutes } from './Components/Auth/ProtectedRoutes'
import ConfirmAccount from './Pages/ConfirmAccount'
import ResetPassword from './Pages/ResetPassword'
import ForgotPassword from './Pages/ForgotPassword'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/confirm-account" element={<ConfirmAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/user" element={<ProtectedRoutes />}>
          <Route path="profile" element={<Profile />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)
