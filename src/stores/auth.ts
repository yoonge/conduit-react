import { useState } from 'react'
import { createGlobalStore } from 'hox'

import { User } from '../types/user'

export const [useAcountStore, getAcountStore] = createGlobalStore(() => {
  const [user, setUser] = useState({} as User)
  const userStr = localStorage.getItem('user') || '{}'
  if (JSON.stringify(user) === '{}' && userStr !== '{}') {
    setUser(JSON.parse(userStr) as User)
  }

  const login = (user: User, token: string) => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }

  const update = (user: User) => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const logout = () => {
    setUser({} as User)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return { login, logout, update, user }
})

export const [useLoadingStore, getLoadingStore] = createGlobalStore(() => {
  const [loading, setLoading] = useState(false)

  return { loading, setLoading }
})
