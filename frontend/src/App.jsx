import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/admin/LoginPage.jsx'
import DashboardPage from './pages/admin/DashboardPage.jsx'
import RatesPage from './pages/admin/RatesPage.jsx'
import SettingsPage from './pages/admin/SettingsPage.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import AdminLayout from './components/admin/AdminLayout.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/admin/login" element={<LoginPage />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="harga-sewa" element={<RatesPage />} />
        <Route path="pengaturan" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<LandingPage />} />
    </Routes>
  )
}
