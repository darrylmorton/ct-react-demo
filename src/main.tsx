import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'

import './App.css'
import './index.css'
import Login from './Pages/Login.tsx'
import Signup from './Pages/Signup.tsx'
import Home from './Pages/Home.tsx'
// import type { RequestModeType } from './util/AppUtil.ts'

// switch (process.env.NODE_ENV) {
//   case 'production':
//     process.env.REACT_APP_SERVICE_HOSTNAME = 'https://example.com'
//     process.env.REACT_APP_CORS_MODE = 'cors' as RequestModeType
//     break
//   case 'development':
//     process.env.REACT_APP_SERVICE_HOSTNAME = 'http://dev.example.com'
//     process.env.REACT_APP_CORS_MODE = 'cors' as RequestModeType
//     break
// }

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </BrowserRouter>
)
