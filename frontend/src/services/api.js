import axios from 'axios'

export const TOKEN_KEY = 'rental_mobil_admin_token'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Sisipkan JWT ke setiap request kalau ada token tersimpan (hasil login admin).
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Kalau token expired/invalid, bersihkan sesi lalu lempar balik errornya
// supaya komponen pemanggil (mis. ProtectedRoute) bisa redirect ke /admin/login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY)
    }
    return Promise.reject(error)
  }
)

export default api
