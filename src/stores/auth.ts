import { useState } from 'react'
import { createGlobalStore } from 'hox'

import { User } from '../types/user'

export const [useAcountStore, getAcountStore] = createGlobalStore(() => {
  const [user, setUser] = useState({} as User)

  const login = (user: User) => {
    setUser(user)
    localStorage.setItem('token', user.token)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const logout = () => {
    setUser({} as User)
    localStorage.removeItem('token')
  }

  return { user, login, logout }
})
