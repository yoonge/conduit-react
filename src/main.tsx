import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HoxRoot } from 'hox'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Register from './pages/Register'
import TopicDetail from './pages/TopicDetail'
import Profile from './pages/Profile'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.less'

const router = createBrowserRouter([
  { path: '/', element: <Homepage /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/topic-detail/:_id', element: <TopicDetail /> },
  { path: '/profile/:_id', element: <Profile /> },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HoxRoot>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </HoxRoot>
)
