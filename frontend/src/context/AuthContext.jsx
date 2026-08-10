import { createContext, useContext, useEffect, useState } from 'react'
import api, { TOKEN_KEY } from '../services/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  // Saat aplikasi pertama kali dimuat, validasi token yang tersimpan (kalau ada)
  // ke endpoint /auth/me supaya sesi admin tetap "nyala" walau halaman di-refresh.
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) {
      setLoading(false)
      return
    }

    api
      .get('/auth/me')
      .then(({ data }) => setAdmin(data.admin))
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY)
        setAdmin(null)
      })
      .finally(() => setLoading(false))
  }, [])

  async function signIn(email, password) {
    const { data } = await api.post('/auth/login', { email, password })
    localStorage.setItem(TOKEN_KEY, data.token)
    setAdmin(data.admin)
    return data
  }

  function signOut() {
    localStorage.removeItem(TOKEN_KEY)
    setAdmin(null)
  }

  const value = {
    user: admin,
    isAuthenticated: !!admin,
    loading,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth harus dipakai di dalam AuthProvider')
  return ctx
}
