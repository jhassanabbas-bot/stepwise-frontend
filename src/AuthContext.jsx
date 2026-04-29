// src/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import { api } from './api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('sw_token')
    if (token) {
      api.me()
        .then(data => setUser(data))
        .catch(() => localStorage.removeItem('sw_token'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  function login(token, userData) {
    localStorage.setItem('sw_token', token)
    setUser(userData)
  }

  function logout() {
    localStorage.removeItem('sw_token')
    setUser(null)
  }

  function updateUsage(used) {
    setUser(prev => prev ? { ...prev, homeworks_used: used } : prev)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUsage }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
