import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HoxRoot } from 'hox'
import App from './App.tsx'
import Login from './pages/Login'
import Register from './pages/Register'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.less'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HoxRoot>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </HoxRoot>
)
