import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HoxRoot } from 'hox'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Register from './pages/Register'
import TopicInitiate from './pages/TopicInitiate'
import TopicDetail from './pages/TopicDetail'
import Profile from './pages/Profile'
import Settings from './pages/Settings'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.less'

const router = createBrowserRouter([
  { path: '/', element: <Homepage /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/topic/initiate', element: <TopicInitiate /> },
  { path: '/topic-detail/:_id', element: <TopicDetail /> },
  { path: '/profile/:username', element: <Profile /> },
  { path: '/settings', element: <Settings /> },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HoxRoot>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </HoxRoot>
)
