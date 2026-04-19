import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../lib/api'

const AuthContext = createContext(null)
const SESSION_KEY = 'pourbebe-session'

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY) ?? 'null')
    if (session?.user) setUser(session.user)
    setLoading(false)

    function handleExpired() {
      setUser(null)
    }
    window.addEventListener('auth:expired', handleExpired)
    return () => window.removeEventListener('auth:expired', handleExpired)
  }, [])

  async function login(email, password) {
    const res = await api.post('/auth/login', { email, password })
    const { token, user } = res.data.data
    localStorage.setItem(SESSION_KEY, JSON.stringify({ token, user }))
    setUser(user)
  }

  async function register(name, email, password) {
    const res = await api.post('/auth/register', { name, email, password })
    const { token, user } = res.data.data
    localStorage.setItem(SESSION_KEY, JSON.stringify({ token, user }))
    setUser(user)
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
